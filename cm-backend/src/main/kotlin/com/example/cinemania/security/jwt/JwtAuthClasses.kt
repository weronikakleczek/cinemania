package com.example.cinemania.security.jwt

data class JwtAuthRequest(val username: String, val password: String)
data class JwtAuthResponse(val jwt: String)