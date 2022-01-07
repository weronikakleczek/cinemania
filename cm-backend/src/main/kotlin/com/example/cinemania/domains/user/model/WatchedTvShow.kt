package com.example.cinemania.domains.user.model

import javax.persistence.*

@Entity(name = "watched_tv_show")
data class WatchedTvShow(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var watchedTvShowId: Long = 0L,
    @ManyToOne @JoinColumn(name="user_id", nullable=false) var user: User,
    @Column(nullable = false) var tvShowId: Long,
    @Column(nullable = true) var score: Int? = null,
    @Column(nullable = true, length = 1000) var review: String? = null,
)