package com.example.cinemania.domains.user.controller

import com.example.cinemania.domains.user.model.MovieReviewDto
import com.example.cinemania.domains.user.service.WatchedMovieService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/watched/movie")
@CrossOrigin(origins = ["http://localhost:3000"])
class WatchedMovieController(val watchedMovieService: WatchedMovieService) {

    @GetMapping("/all/{username}")
    fun getWatchedMoviesByUser(@PathVariable("username") username: String): ResponseEntity<Any> =
        watchedMovieService.getWatchedMoviesByUsername(username)

    @PostMapping("/add")
    fun addWatchedMovie(@RequestBody movieReviewDto: MovieReviewDto): ResponseEntity<Any> =
        watchedMovieService.addWatchedMovie(movieReviewDto)

    @GetMapping("/{movieId}/{username}/isWatched")
    fun isMovieWatched(
        @PathVariable("movieId") movieId: Long,
        @PathVariable("username") username: String
    ): ResponseEntity<Boolean> =
        watchedMovieService.isMovieWatched(movieId, username)

    @GetMapping("/{movieId}/{username}/score")
    fun getUserScoreOfMovie(
        @PathVariable("movieId") movieId: Long,
        @PathVariable("username") username: String
    ): ResponseEntity<Any> =
        watchedMovieService.getUserScoreOfMovie(movieId, username)

    @GetMapping("/{movieId}/{username}/review")
    fun getUserReviewOfMovie(
        @PathVariable("movieId") movieId: Long,
        @PathVariable("username") username: String
    ): ResponseEntity<Any> =
        watchedMovieService.getUserReviewOfMovie(movieId, username)
}