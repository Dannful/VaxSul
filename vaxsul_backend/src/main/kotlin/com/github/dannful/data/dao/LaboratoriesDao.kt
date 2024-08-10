package com.github.dannful.data.dao

import com.github.dannful.data.entity.Laboratories
import com.github.dannful.domain.model.Laboratory
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class LaboratoriesDao(id: EntityID<Int>) : IntEntity(id) {

    companion object : IntEntityClass<LaboratoriesDao>(Laboratories)

    var name by Laboratories.name
    var description by Laboratories.description
    var cnpj by Laboratories.cnpj

    fun toLaboratory() = Laboratory(
        id = id.value,
        name = name,
        description = description,
        cnpj = cnpj
    )
}