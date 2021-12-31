package com.example.cinemania.domains.user.controller

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

    @PostMapping("/add/{username}/{tvShowId}")
    fun addWatchedTvShow(
        @PathVariable("username") username: String,
        @PathVariable("tvShowId") tvShowId: Long
    ): ResponseEntity<Any> = watchedTvShowService.addWatchedTvShow(username, tvShowId)
}