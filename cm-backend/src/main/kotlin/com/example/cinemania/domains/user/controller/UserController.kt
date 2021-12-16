package com.example.cinemania.domains.user.controller

import com.example.cinemania.domains.user.model.User
import com.example.cinemania.domains.user.model.UserRegistrationDto
import com.example.cinemania.domains.user.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = ["http://localhost:3000"])
class UserController(val userService: UserService) {

    @GetMapping("/all")
    fun getAllUsers(): ResponseEntity<List<User>> = ResponseEntity.ok(userService.getAllUsers())

    @PostMapping("/register")
    fun registerUser(@RequestBody userRegistrationDto: UserRegistrationDto): ResponseEntity<User> {
        println(userRegistrationDto)
        return ResponseEntity.ok(userService.registerUser(userRegistrationDto))
    }

    @GetMapping("/admin")
    fun getAdminPanel(): ResponseEntity<String> = ResponseEntity.ok("This is an admin panel.")
}