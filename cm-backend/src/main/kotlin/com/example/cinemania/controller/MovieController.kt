package com.example.cinemania.controller

import com.example.cinemania.model.Movie
import com.example.cinemania.model.MovieList
import com.google.gson.Gson
import com.google.gson.JsonObject
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate

@RestController
@RequestMapping("/movie")
@CrossOrigin(origins = ["http://localhost:3000"])
class MovieController(
    @Value("\${api_base_uri}") private val defaultUri: String,
    @Value("\${api_key}") private val apiKey: String) {

    private val gson: Gson = Gson()
    private val restTemplate: RestTemplate = RestTemplateBuilder()
        .rootUri(defaultUri)
        .build()

    @GetMapping("/{movieId}")
    fun getMovieById(@PathVariable("movieId") movieId: String): Movie  {
        println(apiKey)
        val movie = restTemplate.getForEntity("$defaultUri/movie/$movieId?api_key=$apiKey", String::class.java)
        return gson.fromJson(movie.getBody(), Movie::class.java)
    }

    @GetMapping("/top")
    fun getTopMovies(): List<Movie>  {
        println(apiKey)
        val movie = restTemplate.getForEntity("$defaultUri/movie/top_rated?api_key=$apiKey&language=pl-PL", String::class.java)
        return gson.fromJson(movie.getBody(), MovieList::class.java).results
    }

    @GetMapping("/firstTen")
    fun getFirstMovies(): List<Movie> {
        val movies: MutableList<Movie> = mutableListOf()
        var movieString: ResponseEntity<String>
        for (i in 100..110) {
            movieString = restTemplate.getForEntity("$defaultUri/movie/$i?api_key=$apiKey", String::class.java)
            movies.add(gson.fromJson(movieString.getBody(), Movie::class.java))
        }
        return movies
    }
}