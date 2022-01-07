package com.example.cinemania.security.jwt

import com.example.cinemania.domains.user.exception.FriendshipAlreadyExistsException
import io.jsonwebtoken.ExpiredJwtException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody

@ControllerAdvice
class JwtExceptionHandler {

    @ResponseBody
    @ExceptionHandler(ExpiredJwtException::class)
    fun handleExpiredJwt(e: ExpiredJwtException): ResponseEntity<String> =
        ResponseEntity("Jwt Expired.", HttpStatus.NOT_FOUND);


}