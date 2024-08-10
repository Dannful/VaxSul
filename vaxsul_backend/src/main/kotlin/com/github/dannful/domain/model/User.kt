package com.github.dannful.domain.model

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: Int? = null,
    val email: String,
    val name: String,
    val password: String,
    val role: Role = Role.USER,
    val cpf: String,
    val phone: String,
    val birthday: LocalDateTime
) {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        if (email != other.email) return false
        if (name != other.name) return false
        if (password != other.password) return false
        if (role != other.role) return false
        if (cpf != other.cpf) return false
        if (phone != other.phone) return false
        if (birthday != other.birthday) return false

        return true
    }

    override fun hashCode(): Int {
        var result = email.hashCode()
        result = 31 * result + name.hashCode()
        result = 31 * result + password.hashCode()
        result = 31 * result + role.hashCode()
        result = 31 * result + cpf.hashCode()
        result = 31 * result + phone.hashCode()
        result = 31 * result + birthday.hashCode()
        return result
    }
}
