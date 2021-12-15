package com.example.cinemania.exception

class InvalidMovieIdException(private val movieId: String): RuntimeException(movieId)