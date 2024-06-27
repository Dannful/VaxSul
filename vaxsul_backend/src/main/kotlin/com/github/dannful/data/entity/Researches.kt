package com.github.dannful.data.entity

import com.github.dannful.domain.model.ResearchStatus
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.kotlin.datetime.datetime

object Researches : IntIdTable() {

    val startDate = datetime("start_date")
    val status = enumeration("status", ResearchStatus::class)
}