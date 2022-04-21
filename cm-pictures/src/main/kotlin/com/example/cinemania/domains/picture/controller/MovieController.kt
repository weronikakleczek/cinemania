package com.example.cinemania.domains.picture.controller

import com.example.cinemania.domains.picture.exception.InvalidMovieIdException
import com.example.cinemania.domains.picture.exception.InvalidQueryException
import com.example.cinemania.domains.picture.model.Movie
import com.example.cinemania.domains.picture.model.MovieList
import com.example.cinemania.domains.picture.model.Results
import com.example.cinemania.domains.picture.model.TrendingPicturesList
import com.example.cinemania.domains.picture.service.MovieService
import com.google.gson.Gson
import com.google.gson.JsonElement
import com.google.gson.JsonParser
import org.slf4j.LoggerFactory.getLogger
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.kafka.support.SendResult
import org.springframework.lang.Nullable
import org.springframework.util.concurrent.ListenableFuture
import org.springframework.util.concurrent.ListenableFutureCallback
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate
import kotlin.math.log


@RestController
@RequestMapping("/movie")
@CrossOrigin(origins = ["http://localhost:3000"])
class MovieController(
    @Value("\${api_base_uri}") private val defaultUri: String,
    @Value("\${api_key}") private val apiKey: String,
    private val gson: Gson,
    private val restTemplate: RestTemplate,
    private val movieService: MovieService,
    private val kafkaTemplate: KafkaTemplate<String, String>
) {

    companion object {
        @Suppress("JAVA_CLASS_ON_COMPANION")
        @JvmStatic
        private val logger = getLogger(javaClass.enclosingClass)
    }

    @GetMapping("/{movieId}")
    fun getMovieById(@PathVariable("movieId") movieId: String): Movie {
        try {
            val s = "$defaultUri/movie/$movieId?api_key=$apiKey&language=pl-PL"
            println("Here: $s")
            val movie = restTemplate.getForEntity(s, String::class.java)
            return gson.fromJson(movie.body, Movie::class.java)
        } catch (e: Exception) {
            throw InvalidMovieIdException(movieId)
        }
    }

    @GetMapping("/{movieId}/reviews")
    fun getMovieReviews(@PathVariable("movieId") movieId: Long): ResponseEntity<Any> =
        movieService.getMovieReviews(movieId)

    @GetMapping("/{movieId}/recommendations")
    fun getMovieRecommendations(@PathVariable("movieId") movieId: Long): ResponseEntity<Any> =
        movieService.getMovieRecommendations(movieId)


    @GetMapping("/top")
    fun getFirstMovies(): List<Movie> {
        val movies: MutableList<Movie> = mutableListOf()
        var movieString: ResponseEntity<String>
        for (i in 1..5) {
            movieString = restTemplate.getForEntity(
                "$defaultUri/movie/top_rated?api_key=$apiKey&language=pl-PL&page=$i",
                String::class.java
            )
            movies.addAll(gson.fromJson(movieString.body, MovieList::class.java).results)
        }
        return movies
    }

    @GetMapping("/trending")
    fun getTrendingPictures(): ResponseEntity<List<Results>> {
        val trendingPicturesString: ResponseEntity<String> =
            restTemplate.getForEntity("$defaultUri/trending/all/day?api_key=$apiKey&language=pl-PL", String::class.java)
        return ResponseEntity.ok(gson.fromJson(trendingPicturesString.body, TrendingPicturesList::class.java).results)
    }

    @GetMapping("/query/{query}")
    fun getPicturesByQuery(@PathVariable("query") query: String, @RequestParam page: Int): List<Movie> {

        println("Query: $query")

        try {
            val movie = restTemplate.getForEntity(
                "$defaultUri/search/movie?api_key=$apiKey&query=$query&language=pl-PL&page=$page",
                String::class.java
            )
            return gson.fromJson(movie.body, MovieList::class.java).results
        } catch (e: Exception) {
            throw InvalidQueryException(query)
        }
    }

    @GetMapping("/genres")
    fun getGenres(@RequestParam type: String): ResponseEntity<List<JsonElement>> {
        val trendingPicturesString: ResponseEntity<String> = restTemplate
            .getForEntity("$defaultUri/genre/$type/list?api_key=$apiKey&language=pl-PL", String::class.java)

        val listOfGenres: List<JsonElement> = JsonParser
            .parseString(trendingPicturesString.body)
            .asJsonObject.get("genres")
            .asJsonArray
            .toList()

        return ResponseEntity.ok(listOfGenres)
    }

    @PostMapping("/filter")
    fun getPicturesByFilter(
        @RequestBody filterJson: JsonElement?,
        @RequestParam page: Int,
        @RequestParam type: String
        ): ResponseEntity<List<JsonElement>> {

        val stringBuilder = StringBuilder("$defaultUri/discover/$type?api_key=$apiKey&language=pl-PL&page=$page")

        filterJson?.asJsonObject?.entrySet()?.forEach { x: Map.Entry<String, JsonElement> ->
            stringBuilder.append(
                "&${x.key}=${
                    x.value.asJsonArray.joinToString(",").replace("\"", "")
                }"
            )
        }
        val filteredUrl = stringBuilder.toString()

        println("URL: $filteredUrl")

        try {
            val movie = restTemplate.getForEntity(
                filteredUrl,
                String::class.java
            )
            val filteredPictures: List<JsonElement> = JsonParser
                .parseString(movie.body)
                .asJsonObject.get("results")
                .asJsonArray
                .toList()
            return ResponseEntity.ok(filteredPictures)
        } catch (e: Exception) {
            throw Exception(e)
        }
    }


    @GetMapping("/foo/{mess}")
    fun exampleEndpointToTestConnectionToTheOtherMicroservice(@PathVariable("mess") mess: String): ResponseEntity<String> {
        println(">> Endpoint accessed in here <<")


        kafkaTemplate.send("foo-topic", mess)

        return ResponseEntity.ok("Message has been sent via Kafka")

//        val resposeString: String? = restTemplate.getForObject(
//            "http://SURVEYS/surveys/hello",
//            String::class.java
//        )
//        return resposeString
//            ?.let { ResponseEntity.ok(it) }
//            ?: ResponseEntity.status(NOT_FOUND).body("Did not get any asnwer  :(")
    }


}
