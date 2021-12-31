package com.example.cinemania.domains.picture.controller

import com.google.gson.Gson
import com.google.gson.JsonElement
import com.google.gson.JsonParser
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate

@RestController
@RequestMapping("/tv")
@CrossOrigin(origins = ["http://localhost:3000"])
class TvController(
    @Value("\${api_base_uri}") private val defaultUri: String,
    @Value("\${api_key}") private val apiKey: String
) {

    private val gson: Gson = Gson()
    private val restTemplate: RestTemplate = RestTemplateBuilder()
        .rootUri(defaultUri)
        .build()

    @GetMapping("/{tvShowId}")
    fun getMovieById(@PathVariable("tvShowId") tvShowId: String): ResponseEntity<JsonElement> {

        val tvShowString: ResponseEntity<String> = restTemplate
            .getForEntity("$defaultUri/tv/$tvShowId?api_key=$apiKey&language=pl-PL", String::class.java)

        return ResponseEntity.ok(JsonParser.parseString(tvShowString.body))
    }

}