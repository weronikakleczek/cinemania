package com.example.cinemania.domains.user.service

import com.example.cinemania.domains.user.exception.FriendshipAlreadyExistsException
import com.example.cinemania.domains.user.model.*
import com.example.cinemania.domains.user.repository.FriendshipRepository
import com.example.cinemania.domains.user.repository.UserRepository
import com.example.cinemania.domains.user.repository.WatchedMovieRepository
import com.example.cinemania.domains.user.repository.WatchedTvShowRepository
import com.example.cinemania.security.CinemaniaUserDetails
import com.google.gson.Gson
import com.google.gson.JsonParser
import org.modelmapper.ModelMapper
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.client.RestTemplate
import java.time.Instant

@Service
class UserService(
    @Value("\${api_base_uri}") private val defaultUri: String,
    @Value("\${api_key}") private val apiKey: String,
    val userRepository: UserRepository,
    val friendshipRepository: FriendshipRepository,
    val watchedMovieRepository: WatchedMovieRepository,
    val watchedTvShowRepository: WatchedTvShowRepository,
    val passwordEncoder: PasswordEncoder,
    val modelMapper: ModelMapper,
    val restTemplate: RestTemplate,
    val gson: Gson
) {

    fun getAllUsers(): List<User> = userRepository.findAll()

    fun registerUser(userRegistrationDto: UserRegistrationDto): User? =
        modelMapper.map(userRegistrationDto, User::class.java)?.copy(
            password = passwordEncoder.encode(userRegistrationDto.password),
            roles = mutableSetOf(Role.USER),
            watchedMovies = mutableListOf(),
            watchedTvShows = mutableListOf(),
            creationDate = Instant.now()
        )?.let { userRepository.save(it) }

    fun getUserInfo(username: String): ResponseEntity<Any> =
        userRepository.findByUsernameIgnoreCase(username)
            ?.let { modelMapper.map(it, UserInfoDto::class.java) }
            ?.let { it.copy(creationDate = it.creationDate.split("T")[0]) }
            ?.let { ResponseEntity.ok(it) }
            ?: throw RuntimeException()

    fun addNewFriend(username: String): ResponseEntity<Any> {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        val loggedInUser: User? = userRepository.findByUsernameIgnoreCase(auth.name)
        val friendToAdd: User? = userRepository.findByUsernameIgnoreCase(username)

        return loggedInUser?.also { x ->
            friendToAdd?.let { y ->
                friendshipRepository.findFriendshipByUserOneUserIdAndUserTwoUserId(x.userId, y.userId)
                    ?.also { throw FriendshipAlreadyExistsException(x.username, y.username) }
            }
        }?.also { x -> friendToAdd?.let { y -> friendshipRepository.save(Friendship(userOne = x, userTwo = y)) } }
            ?.let { ResponseEntity.ok("$loggedInUser successfully added ${friendToAdd ?: "???"} to friends.") }
            ?: ResponseEntity.status(NOT_FOUND).body("To do.") // TODO
    }

    fun getAllFriends(): ResponseEntity<Any> {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        val loggedInUser: User? = userRepository.findByUsernameIgnoreCase(auth.name)
        return loggedInUser?.let { friendshipRepository.findAllByUserOneOrUserTwo(it, it) }?.map {
            if (it?.userOne?.username == loggedInUser.username) it.userTwo else it?.userOne
        }?.let { ResponseEntity.ok(it) } ?: ResponseEntity.status(NOT_FOUND).body("To do") // TODO
    }

    fun findUserByQuery(query: String): ResponseEntity<Any> =
        userRepository.findAllByUsernameContaining(query)
            ?.filter { it.username != SecurityContextHolder.getContext().authentication.name }
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.status(NOT_FOUND).body("User not found by query.")

    fun findFriendByQuery(query: String): ResponseEntity<Any> {
        val auth = SecurityContextHolder.getContext().authentication
        val name = auth.name
        val userId = (auth.principal as CinemaniaUserDetails).user.userId
        val friendships = friendshipRepository.findAllByUserOneUserIdOrUserTwoUserId(userId, userId)
        val friendsByQuery = userRepository.findAllByUsernameContaining(query)

        return friendsByQuery
            ?.filter { it.username != name }
            ?.filter { friendships.none { friendsByQuery.contains(it?.userOne) } }
            ?.filter { friendships.none { friendsByQuery.contains(it?.userTwo) } }
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.status(NOT_FOUND).body("Can not find user with username like $query.")
    }

    fun getUserStats(): ResponseEntity<Any> {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        val loggedInUser: User =
            userRepository.findByUsernameIgnoreCase(auth.name)
                ?: return ResponseEntity.status(NOT_FOUND).body("To do.")//TODO

        val numberOfWatchedMovies = getNumberOfWatched(PictureType.Movie, loggedInUser)
        val numberOfWatchedTvShows = getNumberOfWatched(PictureType.TvShow, loggedInUser)
        val numberOfHoursWatching = getHoursSpentWatching(PictureType.Movie, loggedInUser) +
                getHoursSpentWatching(PictureType.TvShow, loggedInUser)

        return ResponseEntity.ok(
            UserStatsDto(
                numberOfWatchedMovies,
                numberOfWatchedTvShows,
                numberOfHoursWatching
            )
        )
    }

    fun getNumberOfWatched(type: PictureType, user: User): Int = when (type) {
        PictureType.Movie -> watchedMovieRepository.countWatchedMovieByUser(user)
        PictureType.TvShow -> watchedTvShowRepository.countWatchedTvShowByUser(user)
    }

    fun getHoursSpentWatching(type: PictureType, user: User): Int = when (type) {
        PictureType.Movie -> {
            watchedMovieRepository.findAllByUser(user)
                .takeIf { it.isNotEmpty() }
                ?.asSequence()
                ?.map { it.movieId }
                ?.map {
                    restTemplate.getForEntity(
                        "$defaultUri/movie/${it}?api_key=$apiKey&language=pl-PL",
                        String::class.java
                    )
                }
                ?.map { JsonParser.parseString(it.body).asJsonObject.get("runtime").asInt }
                ?.reduce { sum, element -> sum + element }
                ?.let { it / 60 }
                ?: 0
        }
        PictureType.TvShow -> {
            watchedTvShowRepository.findAllByUser(user)
                .takeIf { it.isNotEmpty() }
                ?.asSequence()
                ?.map { it.tvShowId }
                ?.map {
                    restTemplate.getForEntity(
                        "$defaultUri/tv/${it}?api_key=$apiKey&language=pl-PL",
                        String::class.java
                    )
                }
                ?.map {
                    JsonParser.parseString(it.body).asJsonObject
                        .get("number_of_episodes").asInt *
                            ((JsonParser.parseString(it.body).asJsonObject
                                .get("episode_run_time").asJsonArray
                                .toList()
                                .getOrNull(0)
                                ?.asInt) ?: 45)
                }
                ?.reduce { sum, element -> sum + element }
                ?.let { it / 60 }
                ?: 0
        }
    }

    fun updateUserInfo(userUpdateInfoDto: UserUpdateInfoDto): ResponseEntity<Any> {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        val loggedInUser: User? = userRepository.findByUsernameIgnoreCase(auth.name)
        return loggedInUser
            ?.copy(
                firstName = userUpdateInfoDto.firstName ?: loggedInUser.firstName,
                lastName = userUpdateInfoDto.lastName ?: loggedInUser.lastName,
                email = userUpdateInfoDto.email ?: loggedInUser.email,
                password = userUpdateInfoDto.password
                    ?.let { passwordEncoder.encode(it) }
                    ?: loggedInUser.password
            )
            ?.let { userRepository.save(it) }
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.status(BAD_REQUEST).body("Couldn't update user info.")
    }

    fun getUserNameById(userId: Long): ResponseEntity<Any> =
        userRepository.findByUserId(userId)
            ?.let { ResponseEntity.ok(it.username) }
            ?: ResponseEntity.status(NOT_FOUND).body("User not found.")

    @Transactional
    fun removeFriend(friendToDeleteId: Long): ResponseEntity<Any> {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        val loggedInUser: User = userRepository.findByUsernameIgnoreCase(auth.name)
            ?: return ResponseEntity.status(NOT_FOUND).body("User not found.")
        val friendToRemove: User = userRepository.findByUserId(friendToDeleteId)
            ?: return ResponseEntity.status(NOT_FOUND).body("User not found.")

        return friendshipRepository
            .removeFriendshipByUserOneUserIdAndUserTwoUserId(loggedInUser, friendToRemove)
            ?.let { ResponseEntity.ok("Successfully removed friendship.") }
            ?: ResponseEntity.status(NOT_FOUND).body("Friendship not found.")
    }

    @Transactional
    fun removeAccount(): ResponseEntity<Any> =
        SecurityContextHolder.getContext().authentication
            .let { userRepository.findByUsernameIgnoreCase(it.name) }
            ?.let {
                friendshipRepository.removeFriendshipByUserOneUserIdOrUserTwoUserId(it, it)
                watchedMovieRepository.removeWatchedMovieByUser(it)
                watchedTvShowRepository.removeWatchedTvShowByUser(it)
                userRepository.removeUserByUserId(it.userId)
            }
            ?.let { ResponseEntity.ok("You successfully removed your account.") }
            ?: ResponseEntity.status(NOT_FOUND).body("User not found.")

    @Transactional
    fun removeOtherUser(userToDeleteId: Long): ResponseEntity<Any> =
        userRepository.findByUserId(userToDeleteId)
            ?.let {
                friendshipRepository.removeFriendshipByUserOneUserIdOrUserTwoUserId(it, it)
                watchedMovieRepository.removeWatchedMovieByUser(it)
                watchedTvShowRepository.removeWatchedTvShowByUser(it)
                userRepository.removeUserByUserId(it.userId)
            }
            ?.let { ResponseEntity.ok("You successfully removed user.") }
            ?: ResponseEntity.status(NOT_FOUND).body("User not found.")
}

sealed class PictureType {
    object Movie : PictureType()
    object TvShow : PictureType()
}
