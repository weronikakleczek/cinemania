package com.example.cinemania.domains.picture.service

import com.example.cinemania.domains.user.repository.WatchedTvShowRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class TvService(private val watchedTvShowRepository: WatchedTvShowRepository) {

    fun getTvShowsReviews(tvShowId: Long): ResponseEntity<Any> =
        watchedTvShowRepository.findAllByTvShowId(tvShowId)
            .filter { it.review != null }
            .let { ResponseEntity.ok(it) }
}