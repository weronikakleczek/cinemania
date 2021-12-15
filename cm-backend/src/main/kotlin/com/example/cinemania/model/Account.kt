package com.example.cinemania.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class Account(
    @Id val account: Long,
    @Column var login: String,
    @Column var password: String,
)