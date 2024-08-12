package com.github.dannful.data.entity

import com.github.dannful.domain.model.ResearchStatus
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.kotlin.datetime.datetime

object Researches : IntIdTable() {

    val laboratoryId = reference("laboratoryId", Laboratories)
    val startDate = datetime("startDate")
    val status = enumeration("status", ResearchStatus::class)
    val progress = float("progress").check(name = "check_valid_progress") {
        it greaterEq 0f and (it lessEq 100f)
    }.default(0f)
    val name = varchar("name", 255)
    val description = varchar("description", 255)
    val report = varchar("report", 255)
}