package com.example.cinemania.security.jwt

import io.jsonwebtoken.Claims
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.util.*
import java.util.function.Function

@Service
class JwtUtil {

    private val SECRET: String = "secret_to_be_changed_later"
    private val TWO_DAYS: Long = 172800000L

    fun getUsernameFromToken(token: String): String? = getClaimFromToken(token, Claims::getSubject)
    fun getExpirationDateFromToken(token: String): Date? = getClaimFromToken(token, Claims::getExpiration)

    fun generateToken(userDetails: UserDetails): String {
        val claims: Map<String, Any> = HashMap()
        val username = userDetails.username
        return createToken(claims, username)
    }

    fun validateToken(token: String?, userDetails: UserDetails): Boolean {
        val username = getUsernameFromToken(token!!)
        return (username == userDetails.username) && !isTokenExpired(token)
    }

    private fun <T> getClaimFromToken(token: String, claimsResolver: Function<Claims, T>): T? {
        val claims: Claims? = getAllClaimsFromToken(token)
        return claims?.let { claimsResolver.apply(it) }
    }

    private fun getAllClaimsFromToken(token: String): Claims? {
        return try {
            Jwts.parser().setSigningKey(SECRET)
                .parseClaimsJws(token).body
        } catch (e: ExpiredJwtException) {
            null
        }
    }

    private fun isTokenExpired(token: String): Boolean {
        val expiration: Date? = getExpirationDateFromToken(token)
        return expiration
            ?.before(Date(System.currentTimeMillis()))
            ?: false
    }

    private fun createToken(claims: Map<String, Any>, subject: String): String =
        Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + TWO_DAYS))
            .signWith(SignatureAlgorithm.HS256, SECRET)
            .compact()


}