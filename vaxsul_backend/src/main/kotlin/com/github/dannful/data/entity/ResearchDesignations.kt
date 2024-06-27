package com.github.dannful.data.entity

import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.Table

object ResearchDesignations : Table("research_designations") {

    val researchId =
        reference("researchId", Researches, onDelete = ReferenceOption.CASCADE, onUpdate = ReferenceOption.CASCADE)
    val researcherId =
        reference("researcherId", Users, onDelete = ReferenceOption.CASCADE, onUpdate = ReferenceOption.CASCADE)

    override val primaryKey = PrimaryKey(researcherId, researchId)
}