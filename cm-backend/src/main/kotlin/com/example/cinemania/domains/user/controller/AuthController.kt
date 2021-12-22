package com.example.cinemania.domains.user.controller

import com.example.cinemania.security.CinemaniaUserDetailsService
import com.example.cinemania.security.jwt.JwtAuthRequest
import com.example.cinemania.security.jwt.JwtAuthResponse
import com.example.cinemania.security.jwt.JwtUtil
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController(
    val authenticationManager: AuthenticationManager,
    val cinemaniaUserDetailsService: CinemaniaUserDetailsService,
    val jwtUtil: JwtUtil
) {

    @PostMapping("/authenticate")
    fun createAuthenticationToken(@RequestBody authRequest: JwtAuthRequest): ResponseEntity<Any> {
        try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    authRequest.username,
                    authRequest.password
                )
            )
        } catch (e: Exception) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Invalid username or password, error message: ${e.message}")
        }
        val userDetails = cinemaniaUserDetailsService.loadUserByUsername(authRequest.username)
        val jwtToken = jwtUtil.generateToken(userDetails)
        return ResponseEntity.ok(JwtAuthResponse(jwtToken))
    }

}