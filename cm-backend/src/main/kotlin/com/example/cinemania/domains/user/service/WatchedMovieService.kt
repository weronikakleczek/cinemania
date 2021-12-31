package com.example.cinemania.domains.user.service

import com.example.cinemania.domains.picture.model.Movie
import com.example.cinemania.domains.user.model.WatchedMovie
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
    val watchedMovieRepository: WatchedMovieRepository,
    val userRepository: UserRepository,
    @Value("\${api_base_uri}") private val defaultUri: String,
    @Value("\${api_key}") private val apiKey: String
) {

    private val gson: Gson = Gson()
    private val restTemplate: RestTemplate = RestTemplateBuilder()
        .rootUri(defaultUri)
        .build()

    fun getWatchedMoviesByUsername(username: String): ResponseEntity<Any> {
        val user = userRepository.findByUsernameIgnoreCase(username)
        return user
            ?.let { watchedMovieRepository.findAllByUser(it) }
            ?.map { restTemplate.getForEntity("$defaultUri/movie/${it.movieId}?api_key=$apiKey&language=pl-PL", String::class.java) }
            ?.map { gson.fromJson(it.body, Movie::class.java) }
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.status(NOT_FOUND).body("This user does not have watched movies.")
    }

    fun addWatchedMovie(username: String, movieId: Long): ResponseEntity<Any> =
        userRepository.findByUsernameIgnoreCase(username)
            ?.let { ResponseEntity.ok(watchedMovieRepository.save(WatchedMovie(user = it, movieId = movieId))) }
            ?: ResponseEntity.status(NOT_FOUND).body("This user does not have watched movies.")

}