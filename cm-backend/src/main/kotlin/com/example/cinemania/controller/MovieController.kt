package com.example.cinemania.controller

import com.google.gson.Gson
import com.google.gson.JsonObject
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate

@RestController
@RequestMapping("/movie")
class MovieController(
    @Value("\${api_base_uri}") private val defaultUri: String,
    @Value("\${api_key}") private val apiKey: String) {

    private val gson: Gson = Gson()
    private val restTemplate: RestTemplate = RestTemplateBuilder()
        .rootUri(defaultUri)
        .build()

    @GetMapping("/{movieId}")
    fun getMovieById(@PathVariable("movieId") movieId: String): JsonObject  {
        println(apiKey)
        val movie = restTemplate.getForEntity("$defaultUri/movie/$movieId?api_key=$apiKey", String::class.java)
        val jsonObject = gson.fromJson(movie.getBody(), JsonObject::class.java)
        return jsonObject
    }
}