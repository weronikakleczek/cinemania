package com.example.cinemania.domains.user.repository

import com.example.cinemania.domains.user.model.User
import com.example.cinemania.domains.user.model.WatchedTvShow
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface WatchedTvShowRepository : JpaRepository<WatchedTvShow, Long> {
    fun findAllByUser(user: User): List<WatchedTvShow>
    fun findAllByTvShowId(tvShowId: Long): List<WatchedTvShow>
    fun countWatchedTvShowByUser(user: User): Int

}