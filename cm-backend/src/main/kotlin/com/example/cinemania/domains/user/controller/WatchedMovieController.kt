package com.example.cinemania.domains.user.controller

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

    @PostMapping("/add/{username}/{movieId}")
    fun addWatchedMovie(
        @PathVariable("username") username: String,
        @PathVariable("movieId") movieId: Long
    ): ResponseEntity<Any> = watchedMovieService.addWatchedMovie(username, movieId)


}