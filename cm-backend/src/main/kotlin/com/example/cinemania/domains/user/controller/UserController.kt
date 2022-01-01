package com.example.cinemania.domains.user.controller

import com.example.cinemania.domains.user.model.User
import com.example.cinemania.domains.user.model.UserInfoDto
import com.example.cinemania.domains.user.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = ["http://localhost:3000"])
class UserController(val userService: UserService) {

    @GetMapping("/all")
    fun getAllUsers(): ResponseEntity<List<User>> = ResponseEntity.ok(userService.getAllUsers())

    @GetMapping("/admin")
    fun getAdminPanel(): ResponseEntity<String> = ResponseEntity.ok("This is an admin panel.")

    @GetMapping("/only_user")
    fun getUserPanel(): ResponseEntity<String> = ResponseEntity.ok("This is an user panel.")

    @GetMapping("/info/{username}")
    fun getUserInfo(@PathVariable("username") username: String): ResponseEntity<Any> {
        val auth: Authentication = SecurityContextHolder.getContext().authentication
        return when (auth.name) {
            username -> userService.getUserInfo(username)
            else -> ResponseEntity.status(NOT_FOUND).body("You can only get info about currently logged in user.")
        }
    }

    @GetMapping("/friends/find/{query}")
    fun findUserByQuery(@PathVariable("query") query: String): ResponseEntity<Any> =
        userService.findUserByQuery(query)

    @PostMapping("/friends/add/{userToAdd}")
    fun addNewFriend(@PathVariable("userToAdd") username: String): ResponseEntity<Any> =
        userService.addNewFriend(username)

    @GetMapping("/friends/all")
    fun getAllFriends(): ResponseEntity<Any> =
        userService.getAllFriends()

    @GetMapping("/stats")
    fun getUserStats(): ResponseEntity<Any> =
        userService.getUserStats()
}