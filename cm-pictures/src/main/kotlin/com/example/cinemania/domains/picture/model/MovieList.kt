package com.example.cinemania.domains.picture.model

import com.google.gson.annotations.SerializedName

data class MovieList (
    @SerializedName("page") val page : Int,
    @SerializedName("results") val results : List<Movie>,
    @SerializedName("total_pages") val total_pages : Int,
    @SerializedName("total_results") val total_results : Int
)