package com.example.cinemania.domains.picture.service

import com.example.cinemania.domains.user.repository.WatchedMovieRepository
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class MovieService(private val watchedMovieRepository: WatchedMovieRepository) {

    fun getMovieReviews(movieId: Long): ResponseEntity<Any> =
        watchedMovieRepository.findAllByMovieId(movieId)
            .filter { it.review != null }
            .let { ResponseEntity.ok(it) }
}