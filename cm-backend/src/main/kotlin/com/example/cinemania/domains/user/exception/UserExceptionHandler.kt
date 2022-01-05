package com.example.cinemania.domains.user.exception

import io.jsonwebtoken.ExpiredJwtException
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.HttpStatus.UNAUTHORIZED
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

    @ResponseBody
    @ExceptionHandler(ExpiredJwtException::class)
    fun handleExpiredJwt(e: ExpiredJwtException): ResponseEntity<String> =
        ResponseEntity(e.message, UNAUTHORIZED);


}