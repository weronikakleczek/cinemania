package com.example.cinemania.exception

class InvalidQueryException(private val query: String): RuntimeException(query)