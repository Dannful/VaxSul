package com.github.dannful.data.dao

import com.github.dannful.data.entity.Researches
import com.github.dannful.domain.model.IdResearch
import com.github.dannful.domain.model.ResearchStatus
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
    var laboratoryId by Researches.laboratoryId

    fun toResearch() = IdResearch(
        id = id.value,
        startDate = startDate,
        status = ResearchStatus.valueOf(status),
        progress = progress,
        name = name,
        description = description,
        report = report,
        laboratoryId = laboratoryId.value
    )
}