package com.example.cinemania.domains.user.service

import com.example.cinemania.domains.picture.model.Movie
import com.example.cinemania.domains.user.model.TvReviewDto
import com.example.cinemania.domains.user.model.WatchedMovie
import com.example.cinemania.domains.user.model.WatchedTvShow
import com.example.cinemania.domains.user.repository.UserRepository
import com.example.cinemania.domains.user.repository.WatchedTvShowRepository
import com.google.gson.Gson
import com.google.gson.JsonParser
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class WatchedTvShowService(
    val watchedTvShowRepository: WatchedTvShowRepository,
    val userRepository: UserRepository,
    @Value("\${api_base_uri}") private val defaultUri: String,
    @Value("\${api_key}") private val apiKey: String
) {

    private val gson: Gson = Gson()
    private val restTemplate: RestTemplate = RestTemplateBuilder()
        .rootUri(defaultUri)
        .build()

    fun getWatchedTvShowsByUsername(username: String): ResponseEntity<Any> {
        val user = userRepository.findByUsernameIgnoreCase(username)
        return user
            ?.let { watchedTvShowRepository.findAllByUser(it) }
            ?.map {
                restTemplate.getForEntity(
                    "$defaultUri/tv/${it.tvShowId}?api_key=$apiKey&language=pl-PL",
                    String::class.java
                )
            }
            ?.map { JsonParser.parseString(it.body) }
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body("This user does not have watched tv shows.")
    }

    fun addWatchedTvShow(username: String, tvShowId: Long): ResponseEntity<Any> =
        userRepository.findByUsernameIgnoreCase(username)
            ?.let { ResponseEntity.ok(watchedTvShowRepository.save(WatchedTvShow(user = it, tvShowId = tvShowId))) }
            ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body("This user does not have watched tv shows.")

    fun addWatchedTv(tvReviewDto: TvReviewDto): ResponseEntity<Any> =
        userRepository.findByUsernameIgnoreCase(tvReviewDto.username)
            ?.let {
                WatchedTvShow(
                    user = it,
                    tvShowId = tvReviewDto.tvId,
                    score = tvReviewDto.score,
                    review = tvReviewDto.review
                )
            }
            ?.let { ResponseEntity.ok(watchedTvShowRepository.save(it)) }
            ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body("This user does not have watched tv shows.")
}