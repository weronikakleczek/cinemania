package com.example.cinemania.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody

@ControllerAdvice
class QueryExceptionHandler {

    @ResponseBody
    @ExceptionHandler(InvalidQueryException::class)
    fun handleGithubUserNotFoundException(e: InvalidQueryException): ResponseEntity<String> {
        val status: HttpStatus = HttpStatus.NOT_FOUND;
        return ResponseEntity("Invalid Query: ${e.message}", status);
    }

    @ResponseBody
    @ExceptionHandler(InvalidMovieIdException::class)
    fun handleGithubUserNotFoundException(e: InvalidMovieIdException): ResponseEntity<String> {
        val status: HttpStatus = HttpStatus.NOT_FOUND;
        return ResponseEntity("Invalid Movie ID: ${e.message}", status);
    }

}