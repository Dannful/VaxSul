package com.github.dannful.data.dao

import com.github.dannful.data.entity.Researches
import com.github.dannful.domain.model.Research
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class ResearchesDao(id: EntityID<Int>) : IntEntity(id) {

    companion object : IntEntityClass<ResearchesDao>(Researches)

    var startDate by Researches.startDate
    var status by Researches.status

    fun toResearch() = Research(
        startDate = startDate,
        status = status
    )
}