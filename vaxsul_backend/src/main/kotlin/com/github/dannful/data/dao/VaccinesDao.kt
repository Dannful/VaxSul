package com.github.dannful.data.dao

import com.github.dannful.data.entity.Vaccines
import com.github.dannful.domain.model.Vaccine
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class VaccinesDao(id: EntityID<Int>) : IntEntity(id) {

    companion object : IntEntityClass<VaccinesDao>(Vaccines)

    var pricePerUnit by Vaccines.pricePerUnit
    var amountInStock by Vaccines.amountInStock
    var researchId by Vaccines.researchId
    var sellable by Vaccines.sellable

    fun toVaccine() = Vaccine(
        pricePerUnit = pricePerUnit,
        amountInStock = amountInStock,
        sellable = sellable,
        researchId = researchId?.value
    )
}