package com.example.cinemania.domains.picture.exception

class InvalidMovieIdException(private val movieId: String): RuntimeException(movieId)