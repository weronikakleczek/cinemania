package com.example.cinemania.domains.user.service

import com.example.cinemania.domains.picture.model.Movie
import com.example.cinemania.domains.user.model.MovieReviewDto
import com.example.cinemania.domains.user.model.WatchedMovie
import com.example.cinemania.domains.user.model.WatchedMovieWithMovieInfo
import com.example.cinemania.domains.user.repository.UserRepository
import com.example.cinemania.domains.user.repository.WatchedMovieRepository
import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class WatchedMovieService(
    @Value("\${api_base_uri}") private val defaultUri: String,
    @Value("\${api_key}") private val apiKey: String,
    val watchedMovieRepository: WatchedMovieRepository,
    val userRepository: UserRepository,
    private val restTemplate: RestTemplate,
    private val gson: Gson
) {


    fun getWatchedMoviesByUsername(username: String): ResponseEntity<Any> =
        userRepository.findByUsernameIgnoreCase(username)
            ?.let { watchedMovieRepository.findAllByUser(it) }
            ?.map {
                restTemplate.getForEntity(
                    "$defaultUri/movie/${it.movieId}?api_key=$apiKey&language=pl-PL",
                    String::class.java
                )
            }
            ?.map { gson.fromJson(it.body, Movie::class.java) }
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.status(NOT_FOUND).body("This user does not have watched movies.")

    fun getRecentlyWatchedMoviesByUser(userId: Long): ResponseEntity<Any> =
        userRepository.findByUserId(userId)
            ?.let { watchedMovieRepository.findAllByUser(it) }
            ?.sortedBy { it.score }
            ?.take(3)
            ?.map {
                val stringResponse = restTemplate.getForEntity(
                    "$defaultUri/movie/${it.movieId}?api_key=$apiKey&language=pl-PL",
                    String::class.java
                )
                val movie = gson.fromJson(stringResponse.body, Movie::class.java)
                WatchedMovieWithMovieInfo(
                    it.user.userId,
                    it.movieId,
                    it.score ?: 0,
                    it.review ?: "",
                    movie.poster_path,
                    movie.title,
                    movie.vote_average)
            }
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.status(NOT_FOUND).body("This user does not have watched movies.")

    fun addWatchedMovie(movieReviewDto: MovieReviewDto): ResponseEntity<Any> =
        userRepository.findByUsernameIgnoreCase(movieReviewDto.username)
            ?.let {
                WatchedMovie(
                    user = it,
                    movieId = movieReviewDto.movieId,
                    score = movieReviewDto.score,
                    review = movieReviewDto.review
                )
            }
            ?.let { ResponseEntity.ok(watchedMovieRepository.save(it)) }
            ?: ResponseEntity.status(NOT_FOUND).body("This user does not have watched movies.")

    fun isMovieWatched(movieId: Long, username: String): ResponseEntity<Boolean> =
        userRepository.findByUsernameIgnoreCase(username)
            ?.let { watchedMovieRepository.isMovieWatchedByUser(movieId, it) }
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.status(NOT_FOUND).body(false)

    fun getUserScoreOfMovie(movieId: Long, username: String): ResponseEntity<Any> =
        userRepository.findByUsernameIgnoreCase(username)
            ?.let { watchedMovieRepository.findByUserAndMovieId(it, movieId) }
            ?.let { ResponseEntity.ok(it.score) }
            ?: ResponseEntity.status(NOT_FOUND).body("Score not found.")

    fun getUserReviewOfMovie(movieId: Long, username: String): ResponseEntity<Any>  =
        userRepository.findByUsernameIgnoreCase(username)
            ?.let { watchedMovieRepository.findByUserAndMovieId(it, movieId) }
            ?.let { ResponseEntity.ok(it.review) }
            ?: ResponseEntity.status(NOT_FOUND).body("Review not found.")


}