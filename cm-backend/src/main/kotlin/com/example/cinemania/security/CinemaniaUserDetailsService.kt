package com.example.cinemania.security

import com.example.cinemania.domains.user.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService

class CinemaniaUserDetailsService(val userRepository: UserRepository): UserDetailsService {

    override fun loadUserByUsername(username: String?): UserDetails {
        return userRepository.findByUsernameIgnoreCase(username)
            ?: throw RuntimeException("Placeholder message.")
    }
}