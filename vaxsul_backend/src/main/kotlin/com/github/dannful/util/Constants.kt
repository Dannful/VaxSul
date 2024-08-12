package com.github.dannful.util

object Constants {

    const val AUTH_SESSION_COOKIE = "user-session"

    const val JWT_ADMIN = "auth-admin-token"
    const val JWT_STANDARD = "auth-standard-token"
    const val JWT_MANAGER = "auth-manager-token"
    const val JWT_RESEARCHER = "auth-researcher-token"
    const val JWT_RESEARCH_LEAD = "auth-research-lead-token"

    const val SESSION_ADMIN = "auth-admin-token-session"
    const val SESSION_STANDARD = "auth-standard-token-session"
    const val SESSION_MANAGER = "auth-manager-token-session"
    const val SESSION_RESEARCHER = "auth-researcher-token-session"
    const val SESSION_RESEARCH_LEAD = "auth-research-lead-token-session"

    const val JWT_CLAIM_EMAIL_FIELD_NAME = "email"
    const val JWT_CLAIM_PASSWORD_FIELD_NAME = "password"
    const val JWT_CLAIM_ROLE_FIELD_NAME = "role"
    const val SESSION_DURATION_SECONDS = 30 * 60L
}