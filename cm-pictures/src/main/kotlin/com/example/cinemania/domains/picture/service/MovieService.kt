package com.example.cinemania.domains.picture.service

import com.example.cinemania.domains.picture.model.Movie
import com.example.cinemania.domains.picture.model.MovieList
import com.example.cinemania.domains.picture.model.TrendingPicturesList
import com.example.cinemania.domains.user.repository.WatchedMovieRepository
import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class MovieService(
    private val watchedMovieRepository: WatchedMovieRepository,
    @Value("\${api_base_uri}") private val defaultUri: String,
    @Value("\${api_key}") private val apiKey: String
) {

    private val restTemplate: RestTemplate = RestTemplateBuilder()
        .rootUri(defaultUri)
        .build()
    private val gson: Gson = Gson()


    fun getMovieReviews(movieId: Long): ResponseEntity<Any> =
        watchedMovieRepository.findAllByMovieId(movieId)
            .filter { it.review != null }
            .let { ResponseEntity.ok(it) }

    fun getMovieRecommendations(movieId: Long): ResponseEntity<Any> {
        val recommendedMovies: ResponseEntity<String> =
            restTemplate.getForEntity("$defaultUri/movie/$movieId/recommendations?api_key=$apiKey&language=pl-PLL", String::class.java)
        return ResponseEntity.ok(gson.fromJson(recommendedMovies.body, TrendingPicturesList::class.java).results)
    }
}