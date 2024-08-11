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
    var progress by Researches.progress
    var name by Researches.name
    var description by Researches.description
    var report by Researches.report

    fun toResearch() = Research(
        id = id.value,
        startDate = startDate,
        status = status,
        progress = progress,
        name = name,
        description = description,
        report = report
    )
}