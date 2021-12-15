package com.example.cinemania.domains.user.model

import com.example.cinemania.domains.user.model.Role
import java.time.Instant
import javax.persistence.*

@Entity(name = "account")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var userId: Long,
    @Column var username: String,
    @Column var email: String,
    @Column var password: String,
    @Column var firstName: String,
    @Column var lastName: String,
    @Column var phoneNumber: String,
    @Column var creationDate: Instant,
    @ElementCollection @Enumerated(EnumType.STRING) var roles: MutableSet<Role>
)