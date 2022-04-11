package com.example.cinemania.domains.picture.exception

class InvalidQueryException(private val query: String): RuntimeException(query)