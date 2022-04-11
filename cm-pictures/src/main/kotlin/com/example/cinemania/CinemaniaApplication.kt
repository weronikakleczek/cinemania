package com.example.cinemania

import com.example.cinemania.domains.user.model.Role
import com.example.cinemania.domains.user.model.User
import com.example.cinemania.domains.user.model.WatchedMovie
import com.example.cinemania.domains.user.repository.UserRepository
import com.example.cinemania.domains.user.repository.WatchedMovieRepository
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.EnableEurekaClient
import org.springframework.context.event.EventListener
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.time.Instant


@SpringBootApplication
@EnableWebSecurity
@EnableEurekaClient
class CinemaniaApplication

fun main(args: Array<String>) {
    runApplication<CinemaniaApplication>(*args)
}

@Component
class ApplicationStart(val userRepository: UserRepository,
                       val watchedMovieRepository: WatchedMovieRepository,
                       val passwordEncoder: PasswordEncoder) {
    @EventListener(ApplicationReadyEvent::class)
    fun addAdminsToDb() {
        val admin = User(
            1L,
            "admin",
            "admin@gmail.com",
            passwordEncoder.encode("admin"),
            "first",
            "last",
            Instant.now(),
            mutableListOf(),
            mutableListOf(),
            mutableSetOf(Role.ADMIN)
        )
        val user = User(
            2L,
            "user",
            "user@gmail.com",
            passwordEncoder.encode("user"),
            "first",
            "last",
            Instant.now(),
            mutableListOf(),
            mutableListOf(),
            mutableSetOf(Role.USER)
        )

        val watchedMovie = WatchedMovie(
            1L,
            user,
            123L,
            10,
            "Good!"
        )

        userRepository.saveAll(listOf(admin, user))
        watchedMovieRepository.save(watchedMovie)
    }
}
