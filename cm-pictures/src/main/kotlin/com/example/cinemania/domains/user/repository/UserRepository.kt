package com.example.cinemania.domains.user.repository

import com.example.cinemania.domains.user.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByUserId(userId: Long): User?
    fun findByUsernameIgnoreCase(username: String?): User?
    fun findAllByUsernameContaining(query: String): List<User>?

    @Transactional
    @Modifying
    fun removeUserByUserId(userId: Long): Any?
}