package com.example.cinemania.domains.user.model

enum class Role(val roleName: String) {
    USER("ROLE_USER"), ADMIN("ROLE_ADMIN"), RESEARCHER("ROLE_RESEARCHER"), CRITIC("ROLE_CRITIC")
}