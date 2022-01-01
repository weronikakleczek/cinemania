package com.example.cinemania.domains.user.model

import javax.persistence.*

@Entity(name = "friendship")
data class Friendship(
    @Column(name = "friendship_id") @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val friendshipId: Long = 0L,

    @JoinColumn(name = "user_one_id", referencedColumnName = "user_id", nullable = false, updatable=false, unique = false)
    @ManyToOne(optional = false)
    val userOne: User,

    @JoinColumn(name = "user_two_id", referencedColumnName = "user_id", nullable = false, updatable=false, unique = false)
    @ManyToOne(optional = false)
    val userTwo: User
)