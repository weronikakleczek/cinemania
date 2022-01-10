package com.example.cinemania.domains.user.repository

import com.example.cinemania.domains.user.model.User
import com.example.cinemania.domains.user.model.WatchedMovie
import com.example.cinemania.domains.user.model.WatchedTvShow
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface WatchedTvShowRepository : JpaRepository<WatchedTvShow, Long> {
    fun findAllByUser(user: User): List<WatchedTvShow>
    fun findAllByTvShowId(tvShowId: Long): List<WatchedTvShow>
    fun countWatchedTvShowByUser(user: User): Int
    fun findByUserAndTvShowId(user: User, tvShowId: Long): WatchedTvShow?

    @Query("SELECT CASE WHEN COUNT(wtv) > 0 THEN true ELSE false END " +
            "FROM watched_tv_show wtv WHERE wtv.tvShowId = ?1 " +
            "AND wtv.user = ?2")
    fun isTvShowWatchedByUser(tvShowId: Long, user: User): Boolean

    @Transactional
    @Modifying
    @Query("DELETE FROM watched_tv_show wtv WHERE wtv.user = ?1")
    fun removeWatchedTvShowByUser(userOne: User): Any?
}