package com.example.cinemania.domains.user.model

import com.google.gson.annotations.SerializedName
import javax.persistence.*

data class WatchedMovieWithMovieInfo(
    @SerializedName("user_id") var userId: Long = 0L,
    @SerializedName("id") var movieId: Long = 0L,
    @SerializedName("score") var score: Int = 0,
    @SerializedName("review") var review: String = "",
    @SerializedName("poster_path") var poster_path: String = "",
    @SerializedName("title") var title: String = "",
    @SerializedName("vote_average") var vote_average: Double = 0.0
)