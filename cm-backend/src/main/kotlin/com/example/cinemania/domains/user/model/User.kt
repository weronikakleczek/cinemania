package com.example.cinemania.domains.user.model

import com.example.cinemania.domains.user.model.Role
import java.time.Instant
import javax.persistence.*
import kotlin.jvm.Transient

@Entity(name = "account")
data class User(
    @Column(name = "user_id") @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var userId: Long,
    @Column var username: String,
    @Column var email: String,
    @Column var password: String,
    @Column var firstName: String,
    @Column var lastName: String,
    @Column var creationDate: Instant,
    @OneToMany(mappedBy = "user", cascade = [CascadeType.REMOVE])
    @Transient
    val watchedMovies: List<WatchedMovie> = mutableListOf(),
    @OneToMany(mappedBy = "user", cascade = [CascadeType.REMOVE])
    @Transient
    val watchedTvShows: List<WatchedTvShow> = mutableListOf(),
    @ElementCollection(fetch = FetchType.EAGER) @Enumerated(value = EnumType.STRING) var roles: MutableSet<Role>
)