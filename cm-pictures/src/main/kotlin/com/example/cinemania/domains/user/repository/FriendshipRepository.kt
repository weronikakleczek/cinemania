package com.example.cinemania.domains.user.repository

import com.example.cinemania.domains.user.model.Friendship
import com.example.cinemania.domains.user.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface FriendshipRepository : JpaRepository<Friendship, Long> {
    fun findFriendshipByUserOneUserIdAndUserTwoUserId(userOneUserId: Long, userTwoUserId: Long): Friendship?
    fun findAllByUserOneOrUserTwo(userOne: User, userTwo: User): List<Friendship?>
    fun findAllByUserOneUserIdOrUserTwoUserId(userOneUserId: Long, userTwoUserId: Long): List<Friendship?>

    @Transactional
    @Modifying
    @Query("DELETE FROM friendship f WHERE " +
            "f.userOne = ?1 AND f.userTwo = ?2")
    fun removeFriendshipByUserOneUserIdAndUserTwoUserId(userOne: User, userTwo: User): Any?

    @Transactional
    @Modifying
    @Query("DELETE FROM friendship f WHERE " +
            "f.userOne = ?1 OR f.userTwo = ?2")
    fun removeFriendshipByUserOneUserIdOrUserTwoUserId(userOne: User, userTwo: User): Any?
}
