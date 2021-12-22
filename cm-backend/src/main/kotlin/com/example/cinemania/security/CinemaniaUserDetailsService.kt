package com.example.cinemania.security

import com.example.cinemania.domains.user.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class CinemaniaUserDetailsService(private val userRepository: UserRepository): UserDetailsService {

    override fun loadUserByUsername(username: String?): UserDetails {
        return userRepository
            .findByUsernameIgnoreCase(username)
            ?.let { CinemaniaUserDetails(it) }
            ?: throw RuntimeException("Placeholder message.")
    }
}