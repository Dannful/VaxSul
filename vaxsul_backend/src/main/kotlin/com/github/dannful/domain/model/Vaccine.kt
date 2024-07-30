package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Vaccine(
    val id: Int? = null,
    val pricePerUnit: Float,
    val amountInStock: Int,
    val researchId: Int? = null,
    val sellable: Boolean,
    val dose: Int,
    val description: String,
    val name: String
) {

    override fun equals(other: Any?): Boolean {
        if (other !is Vaccine)
            return false
        return pricePerUnit == other.pricePerUnit && amountInStock == other.amountInStock && researchId == other.researchId && sellable == other.sellable
                && description == other.description && name == other.name && dose == other.dose
    }

    override fun hashCode(): Int {
        var result = pricePerUnit.hashCode()
        result = 31 * result + amountInStock
        result = 31 * result + (researchId ?: 0)
        result = 31 * result + sellable.hashCode()
        result = 31 * result + dose
        result = 31 * result + description.hashCode()
        result = 31 * result + name.hashCode()
        return result
    }
}
