package com.example.cinemania.domains.user.exception

import com.example.cinemania.domains.picture.exception.InvalidMovieIdException
import com.example.cinemania.domains.picture.exception.InvalidQueryException
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody

@ControllerAdvice
class UserExceptionHandler {

    @ResponseBody
    @ExceptionHandler(FriendshipAlreadyExistsException::class)
    fun handleInvalidQueryException(e: FriendshipAlreadyExistsException): ResponseEntity<String> =
        ResponseEntity(e.message, BAD_REQUEST);
}