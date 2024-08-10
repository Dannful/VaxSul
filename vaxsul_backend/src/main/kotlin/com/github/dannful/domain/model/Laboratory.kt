package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Laboratory(
    val id: Int? = null,
    val name: String,
    val description: String,
    val cnpj: String
) {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Laboratory

        if (name != other.name) return false
        if (description != other.description) return false
        if (cnpj != other.cnpj) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + description.hashCode()
        result = 31 * result + cnpj.hashCode()
        return result
    }
}
