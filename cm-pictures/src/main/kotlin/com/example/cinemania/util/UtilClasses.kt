package com.example.cinemania.util

import com.google.gson.Gson
import org.modelmapper.ModelMapper
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.cloud.client.loadbalancer.LoadBalanced
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

@Component
class UtilClasses(
    @Value("\${api_base_uri}") private val defaultUri: String,
) {
    @Bean
    fun getModelMapper(): ModelMapper = ModelMapper()

    @Bean
    fun getGson(): Gson = Gson()

    @Bean
    fun getRestTemplate(): RestTemplate = RestTemplateBuilder()
        .rootUri(defaultUri)
        .build()
}