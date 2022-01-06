package com.example.cinemania.domains.user.controller

import com.example.cinemania.domains.user.model.TvReviewDto
import com.example.cinemania.domains.user.service.WatchedMovieService
import com.example.cinemania.domains.user.service.WatchedTvShowService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/watched/tv")
@CrossOrigin(origins = ["http://localhost:3000"])
class WatchedTvShowController(val watchedTvShowService: WatchedTvShowService) {

    @GetMapping("/all/{username}")
    fun getWatchedTvShowsByUser(@PathVariable("username") username: String): ResponseEntity<Any> =
        watchedTvShowService.getWatchedTvShowsByUsername(username)

    @PostMapping("/add")
    fun addWatchedTv(@RequestBody tvReviewDto: TvReviewDto): ResponseEntity<Any> = watchedTvShowService.addWatchedTv(tvReviewDto)

    @GetMapping("/{tvShowId}/{username}/isWatched")
    fun isMovieWatched(
        @PathVariable("tvShowId") tvShowId: Long,
        @PathVariable("username") username: String
    ): ResponseEntity<Boolean> =
        watchedTvShowService.isTvShowWatched(tvShowId, username)

    @GetMapping("/{tvShowId}/{username}/score")
    fun getUserScoreOfTvShow(
        @PathVariable("tvShowId") tvShowId: Long,
        @PathVariable("username") username: String
    ): ResponseEntity<Any> =
        watchedTvShowService.getUserScoreOfTvShow(tvShowId, username)

    @GetMapping("/{tvShowId}/{username}/review")
    fun getUserReviewOfMovie(
        @PathVariable("tvShowId") tvShowId: Long,
        @PathVariable("username") username: String
    ): ResponseEntity<Any> =
        watchedTvShowService.getUserReviewOfTvShow(tvShowId, username)
}