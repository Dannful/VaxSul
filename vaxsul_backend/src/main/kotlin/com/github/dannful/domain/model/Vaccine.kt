package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Vaccine(
    val id: Int? = null,
    val laboratoryId: Int,
    val pricePerUnit: Float,
    val amountInStock: Int,
    val researchId: Int? = null,
    val dose: Int,
    val description: String,
    val name: String
) {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Vaccine

        if (laboratoryId != other.laboratoryId) return false
        if (pricePerUnit != other.pricePerUnit) return false
        if (amountInStock != other.amountInStock) return false
        if (researchId != other.researchId) return false
        if (dose != other.dose) return false
        if (description != other.description) return false
        if (name != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        var result = laboratoryId
        result = 31 * result + pricePerUnit.hashCode()
        result = 31 * result + amountInStock
        result = 31 * result + (researchId ?: 0)
        result = 31 * result + dose
        result = 31 * result + description.hashCode()
        result = 31 * result + name.hashCode()
        return result
    }
}
