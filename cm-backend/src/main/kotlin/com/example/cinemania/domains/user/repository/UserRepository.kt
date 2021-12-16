package com.example.cinemania.domains.user.repository

import com.example.cinemania.domains.user.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<User, Long> {
    fun findByUsernameIgnoreCase(username: String?): User?
}