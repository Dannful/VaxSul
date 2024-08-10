package com.github.dannful.domain.service

import com.github.dannful.domain.model.Research

interface ResearchService {

    suspend fun getResearches(): List<Research>
    suspend fun getResearch(id: Int): Research?
    suspend fun addResearch(research: Research): Research
    suspend fun deleteResearch(id: Int)
}