package com.example.cinemania.domains.user.controller

import com.example.cinemania.domains.user.model.User
import com.example.cinemania.domains.user.model.UserRegistrationDto
import com.example.cinemania.domains.user.service.UserService
import com.example.cinemania.security.CinemaniaUserDetailsService
import com.example.cinemania.security.jwt.JwtAuthRequest
import com.example.cinemania.security.jwt.JwtAuthResponse
import com.example.cinemania.security.jwt.JwtUtil
import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class AuthController(
    val authenticationManager: AuthenticationManager,
    val cinemaniaUserDetailsService: CinemaniaUserDetailsService,
    val jwtUtil: JwtUtil,
    val userService: UserService
) {

    @PostMapping("/authenticate")
    @CrossOrigin
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
                .status(NOT_FOUND)
                .body("Invalid username or password, error message: ${e.message}")
        }
        val userDetails = cinemaniaUserDetailsService.loadUserByUsername(authRequest.username)
        val jwtToken = jwtUtil.generateToken(userDetails)
        return ResponseEntity.ok(JwtAuthResponse(jwtToken))
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody userRegistrationDto: UserRegistrationDto): ResponseEntity<User> {
        return ResponseEntity.ok(userService.registerUser(userRegistrationDto))
    }

    @GetMapping("/username")
    fun getUsername(): ResponseEntity<Any> = SecurityContextHolder.getContext().authentication
        ?.let { ResponseEntity.ok(it.name) }
        ?: ResponseEntity.status(NOT_FOUND).body("Not found.")
}