package com.example.cinemania.domains.user.exception


class FriendshipAlreadyExistsException(
    private val userOne: String,
    private val userTwo: String
) : RuntimeException("Friendship between $userOne and $userTwo already exists")