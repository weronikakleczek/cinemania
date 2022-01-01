package com.example.cinemania.domains.user.service

import com.example.cinemania.domains.user.exception.FriendshipAlreadyExistsException
import com.example.cinemania.domains.user.model.*
import com.example.cinemania.domains.user.repository.FriendshipRepository
import com.example.cinemania.domains.user.repository.UserRepository
import com.example.cinemania.domains.user.repository.WatchedMovieRepository
import com.example.cinemania.domains.user.repository.WatchedTvShowRepository
import org.modelmapper.ModelMapper
import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class UserService(
    val userRepository: UserRepository,
    val friendshipRepository: FriendshipRepository,
    val watchedMovieRepository: WatchedMovieRepository,
    val watchedTvShowRepository: WatchedTvShowRepository,
    val passwordEncoder: PasswordEncoder,
    val modelMapper: ModelMapper
) {

    fun getAllUsers(): List<User> = userRepository.findAll()

    fun registerUser(userRegistrationDto: UserRegistrationDto): User? =
        modelMapper.map(userRegistrationDto, User::class.java)?.copy(
            password = passwordEncoder.encode(userRegistrationDto.password),
            roles = mutableSetOf(Role.USER),
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
            ?: ResponseEntity.status(NOT_FOUND).body("To be done, 2.")
    }

    fun getAllFriends(): ResponseEntity<Any> {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        val loggedInUser: User? = userRepository.findByUsernameIgnoreCase(auth.name)
        return loggedInUser?.let { friendshipRepository.findAllByUserOneOrUserTwo(it, it) }?.map {
            if (it?.userOne?.username == loggedInUser.username) it.userTwo else it?.userOne
        }?.let { ResponseEntity.ok(it) } ?: ResponseEntity.status(NOT_FOUND).body("To be done, 3.")
    }

    fun findUserByQuery(query: String): ResponseEntity<Any> =
        userRepository.findAllByUsernameContaining(query)?.let { ResponseEntity.ok(it) } ?: ResponseEntity.status(
            NOT_FOUND
        ).body("Can not find user with username like $query.")

    fun getUserStats(): ResponseEntity<Any> {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        val loggedInUser: User? = userRepository.findByUsernameIgnoreCase(auth.name)
        val numberOfWatchedMovies = loggedInUser?.let { watchedMovieRepository.countWatchedMovieByUser(it) }
        val numberOfWatchedTvShows = loggedInUser?.let { watchedTvShowRepository.countWatchedTvShowByUser(it) }

        return numberOfWatchedMovies
            ?.let { x ->
                {
                    numberOfWatchedTvShows?.let { y -> UserStatsDto(x, y) }
                }
            }
            ?.invoke()
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.status(NOT_FOUND).body("To be done")
    }
}
