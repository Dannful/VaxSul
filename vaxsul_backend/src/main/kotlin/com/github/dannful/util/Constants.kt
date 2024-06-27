package com.github.dannful.util

object Constants {

    const val AUTH_SESSION_COOKIE = "user-session"

    const val ADMIN_AUTH_NAME = "auth-admin"

    const val JWT_STANDARD = "auth-standard-token"
    const val JWT_MANAGER = "auth-manager-token"
    const val JWT_RESEARCHER = "auth-researcher-token"
    const val JWT_RESEARCH_LEAD = "auth-research-lead-token"

    const val JWT_CLAIM_USERNAME_FIELD_NAME = "username"
    const val JWT_CLAIM_PASSWORD_FIELD_NAME = "password"
    const val JWT_CLAIM_ROLE_FIELD_NAME = "role"
}