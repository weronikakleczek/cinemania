package com.example.cinemania.domains.user.model

import com.google.gson.annotations.SerializedName

data class UserStatsDto(
    @SerializedName("movies") var numberOfWatchedMovies: Int = 0,
    @SerializedName("tv") var numberOfWatchedTvShows: Int = 0,
)