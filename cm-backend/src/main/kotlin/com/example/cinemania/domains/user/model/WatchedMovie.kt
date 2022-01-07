package com.example.cinemania.domains.user.model

import javax.persistence.*

@Entity(name = "watched_movie")
data class WatchedMovie(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var watchedMovieId: Long = 0L,
    @ManyToOne @JoinColumn(name="user_id", nullable=false) var user: User,
    @Column(name="movie_id", nullable = false) var movieId: Long,
    @Column(name="score", nullable = true) var score: Int? = null,
    @Column(name="review", nullable = true, length = 1000) var review: String? = null,
)