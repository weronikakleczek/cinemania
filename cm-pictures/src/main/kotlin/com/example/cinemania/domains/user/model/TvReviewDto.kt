package com.example.cinemania.domains.user.model

import com.google.gson.annotations.SerializedName

data class TvReviewDto(
    @SerializedName("username") var username: String,
    @SerializedName("tvId") var tvId: Long,
    @SerializedName("score") var score: Int?,
    @SerializedName("review") var review: String?,
)