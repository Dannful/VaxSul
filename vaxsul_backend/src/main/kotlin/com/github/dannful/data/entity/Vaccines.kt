package com.github.dannful.data.entity

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.ReferenceOption

object Vaccines : IntIdTable() {

    val dose = integer("dose").check(name = "check_valid_dose") {
        it greaterEq 1
    }
    val name = varchar("name", 255)
    val description = varchar("description", 255)
    val pricePerUnit = float("pricePerUnit").check(name = "check_valid_price_per_unit") { it greaterEq 0f }
    val amountInStock =
        integer("amountInStock").check(name = "check_valid_amount_in_stock") { it greaterEq 0 }.default(0)
    val researchId =
        reference(
            "researchId",
            Researches,
            onDelete = ReferenceOption.CASCADE,
            onUpdate = ReferenceOption.CASCADE
        )
}