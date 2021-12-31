package com.example.cinemania.domains.user.model

import com.google.gson.annotations.SerializedName
import java.time.Instant
import java.time.Instant.now
import javax.persistence.*

data class UserInfoDto(
    @SerializedName("username") var username: String = "",
    @SerializedName("email") var email: String = "",
    @SerializedName("firstName") var firstName: String = "",
    @SerializedName("lastName") var lastName: String = "",
    @SerializedName("creationDate") var creationDate: Instant = now(),
    @SerializedName("roles") var roles: MutableSet<Role> = mutableSetOf()
)
