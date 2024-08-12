package com.github.dannful.domain.model

import com.github.dannful.util.Constants

enum class Role(private val parents: List<Role>, vararg val authString: String) {


    ADMIN(emptyList(), Constants.JWT_ADMIN, Constants.SESSION_ADMIN), SALES_MANAGER(
        listOf(ADMIN),
        Constants.JWT_MANAGER,
        Constants.SESSION_MANAGER
    ),
    RESEARCH_LEAD(
        listOf(ADMIN),
        Constants.JWT_RESEARCH_LEAD,
        Constants.SESSION_RESEARCH_LEAD
    ),
    RESEARCHER(listOf(RESEARCH_LEAD), Constants.JWT_RESEARCHER, Constants.SESSION_RESEARCHER),
    USER(
        listOf(SALES_MANAGER, RESEARCH_LEAD, RESEARCHER),
        Constants.JWT_STANDARD,
        Constants.SESSION_STANDARD
    );

    fun getParentRoles(): List<Role> {
        if (parents.isEmpty())
            return listOf(this)
        return parents.toMutableList().plus(this) + parents.map { it.getParentRoles() }
            .flatten()
    }
}