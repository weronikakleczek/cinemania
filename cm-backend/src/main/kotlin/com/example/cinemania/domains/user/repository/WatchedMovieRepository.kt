package com.example.cinemania.domains.user.repository

import com.example.cinemania.domains.user.model.User
import com.example.cinemania.domains.user.model.WatchedMovie
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface WatchedMovieRepository: JpaRepository<WatchedMovie, Long> {
    fun findAllByUser(user: User): List<WatchedMovie>
    fun countWatchedMovieByUser(user: User): Int
}