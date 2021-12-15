package com.example.cinemania

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@SpringBootApplication
@EnableWebSecurity
class CinemaniaApplication

fun main(args: Array<String>) {
    runApplication<CinemaniaApplication>(*args)
}
