package com.example.cinemania.domains.user.model

import com.google.gson.annotations.SerializedName

data class MovieReviewDto(
    @SerializedName("username") var username: String,
    @SerializedName("movieId") var movieId: Long,
    @SerializedName("score") var score: Int?,
    @SerializedName("review") var review: String?,
)