package com.example.cinemania.domains.user.repository

import com.example.cinemania.domains.user.model.User
import com.example.cinemania.domains.user.model.WatchedMovie
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface WatchedMovieRepository: JpaRepository<WatchedMovie, Long> {
    fun findAllByUser(user: User): List<WatchedMovie>
    fun findAllByMovieId(movieId: Long): List<WatchedMovie>
    fun countWatchedMovieByUser(user: User): Int
    fun findByUserAndMovieId(user: User, movieId: Long): WatchedMovie?
    
    @Query("SELECT CASE WHEN COUNT(wm) > 0 THEN true ELSE false END " +
            "FROM watched_movie wm WHERE wm.movieId = ?1 " +
            "AND wm.user = ?2")
    fun isMovieWatchedByUser(movieId: Long, user: User): Boolean

    @Transactional
    @Modifying
    @Query("DELETE FROM watched_movie wm WHERE wm.user = ?1")
    fun removeWatchedMovieByUser(userOne: User): Any?
}