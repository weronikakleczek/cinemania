package com.example.cinemania.domains.user.repository

import com.example.cinemania.domains.user.model.Friendship
import com.example.cinemania.domains.user.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FriendshipRepository : JpaRepository<Friendship, Long> {
    fun findFriendshipByUserOneUserIdAndUserTwoUserId(userOneUserId: Long, userTwoUserId: Long): Friendship?
    fun findAllByUserOne(userOne: User): List<Friendship?>
    fun findAllByUserOneOrUserTwo(userOne: User, userTwo: User): List<Friendship?>
}