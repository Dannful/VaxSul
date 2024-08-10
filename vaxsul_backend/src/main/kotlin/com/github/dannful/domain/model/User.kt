package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: Int? = null,
    val email: String,
    val name: String,
    val password: String,
    val role: Role = Role.USER,
    val state: String,
    val city: String
) {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        if (email != other.email) return false
        if (name != other.name) return false
        if (password != other.password) return false
        if (role != other.role) return false
        if (state != other.state) return false
        if (city != other.city) return false

        return true
    }

    override fun hashCode(): Int {
        var result = email.hashCode()
        result = 31 * result + name.hashCode()
        result = 31 * result + password.hashCode()
        result = 31 * result + role.hashCode()
        result = 31 * result + state.hashCode()
        result = 31 * result + city.hashCode()
        return result
    }
}
