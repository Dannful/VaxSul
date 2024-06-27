package com.github.dannful.data.entity

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.ReferenceOption

object Vaccines : IntIdTable() {

    val pricePerUnit = float("price_per_unit").check(name = "check_valid_price_per_unit") { it greaterEq 0f }
    val amountInStock =
        integer("amount_in_stock").check(name = "check_valid_amount_in_stock") { it greaterEq 0 }.default(0)
    val researchId =
        reference(
            "researchId",
            Researches,
            onDelete = ReferenceOption.SET_NULL,
            onUpdate = ReferenceOption.CASCADE
        ).nullable().default(null)
    val sellable = bool("sellable").default(false)
}