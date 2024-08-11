package com.github.dannful.data.dao

import com.github.dannful.data.entity.Vaccines
import com.github.dannful.domain.model.Vaccine
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class VaccinesDao(id: EntityID<Int>) : IntEntity(id) {

    companion object : IntEntityClass<VaccinesDao>(Vaccines)

    var laboratoryId by Vaccines.laboratoryId
    var name by Vaccines.name
    var description by Vaccines.description
    var dose by Vaccines.dose
    var pricePerUnit by Vaccines.pricePerUnit
    var amountInStock by Vaccines.amountInStock
    var researchId by Vaccines.researchId

    fun toVaccine() = Vaccine(
        id = id.value,
        laboratoryId = laboratoryId.value,
        pricePerUnit = pricePerUnit,
        amountInStock = amountInStock,
        researchId = researchId?.value,
        dose = dose,
        description = description,
        name = name
    )
}