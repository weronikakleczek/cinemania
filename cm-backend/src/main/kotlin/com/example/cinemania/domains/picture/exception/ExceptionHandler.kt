package com.example.cinemania.domains.picture.exception

import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody

@ControllerAdvice
class QueryExceptionHandler {

    @ResponseBody
    @ExceptionHandler(InvalidQueryException::class)
    fun handleInvalidQueryException(e: InvalidQueryException): ResponseEntity<String> =
        ResponseEntity("Invalid Query: ${e.message}", NOT_FOUND);

    @ResponseBody
    @ExceptionHandler(InvalidMovieIdException::class)
    fun handleInvalidMovieIdException(e: InvalidMovieIdException): ResponseEntity<String> =
        ResponseEntity("Invalid Movie ID: ${e.message}", NOT_FOUND);
}