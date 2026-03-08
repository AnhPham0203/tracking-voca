# SYSTEM BLUEPRINT
English Learning System

---

# 1. Project Overview

## Purpose

Build a personal English learning system that supports the workflow:

Daily Dictation → Vocabulary Extraction → Grammar Explanation → Spaced Repetition Review

The system acts as a companion tool for DailyDictation and helps the user:

- Track vocabulary learned from dictation
- Understand grammar structures in sentences
- Store sentences for later review
- Automatically schedule vocabulary review using spaced repetition

Phase 1 focuses on **personal productivity**.

Phase 2 may evolve into a **public SaaS product for English learners**.

---

# 2. Problem Statement

DailyDictation is useful for listening practice but lacks key learning features:

Missing capabilities:

- Vocabulary tracking
- Grammar explanation
- Long-term review system
- Personal learning analytics

This project fills those gaps by building a **personal English learning assistant**.

---

# 3. System Goals

Primary goals:

1. Capture sentences from DailyDictation
2. Analyze sentences using AI
3. Extract vocabulary automatically
4. Explain grammar structures
5. Store vocabulary in a database
6. Implement spaced repetition for review

Secondary goals:

- Create a long-term vocabulary database
- Improve grammar awareness
- Build a personal knowledge base of sentences

---

# 4. High-Level System Architecture
DailyDictation Website
│
│ user selects sentence
▼
Chrome Extension
│
│ send sentence
▼
Backend API (NestJS)
│
├── AI Analysis Service
├── Vocabulary Service
├── Sentence Service
└── Review Service
│
▼
PostgreSQL
│
▼
Redis
│
▼
Frontend UI

---

# 5. System Components

## 5.1 Chrome Extension

Purpose:

Capture sentences directly from the DailyDictation website.

Main features:

- Highlight sentence
- Right-click menu "Analyze Sentence"
- Send sentence to backend API

Responsibilities:

- Extract selected text
- Send HTTP request
- Display analysis result popup

Technology:

- Chrome Extension (Manifest v3)
- TypeScript
- Fetch API

---

## 5.2 Backend API

Backend built with NestJS.

Responsibilities:

- Receive sentences
- Call AI service
- Extract vocabulary and grammar
- Store learning data
- Provide review APIs

Main modules:
src
├── auth
├── sentence
├── vocabulary
├── grammar
├── ai
├── review
└── user


Module responsibilities:

Sentence Module  
Stores sentences learned by the user.

Vocabulary Module  
Manages vocabulary and meanings.

Grammar Module  
Stores grammar explanations.

AI Module  
Handles AI prompt and response parsing.

Review Module  
Implements spaced repetition algorithm.

User Module  
User account and personalization.

---

# 6. User Flow

## Flow 1 — Learning from Dictation

User workflow:

1. User practices dictation on DailyDictation
2. User checks the correct answer
3. User highlights the sentence
4. Chrome Extension sends sentence to backend
5. Backend calls AI analysis
6. AI returns vocabulary and grammar
7. System stores learning data

Flow diagram:

DailyDictation
↓
Highlight Sentence
↓
Chrome Extension
↓
POST /api/analyze
↓
AI Analysis
↓
Save Sentence
Save Vocabulary
Save Grammar


---

## Flow 2 — Vocabulary Tracking

User opens the dashboard.

The system displays:

- Vocabulary learned today
- Total vocabulary learned
- Vocabulary review status

Example:
Words learned today: 8
Total vocabulary: 540
Review due today: 12


---

## Flow 3 — Spaced Repetition Review

Every day the user reviews vocabulary.

Process:

1. System fetches vocabulary due today
2. Show flashcards
3. User marks difficulty
4. System updates review schedule

Flow:
Open Review Page
↓
Fetch due vocabulary
↓
Show flashcards
↓
User rating
↓
Update next review date


---

# 7. Database Design

## Table: sentences

Stores all analyzed sentences.

Fields:

| field | type | description |
|-----|-----|-----|
id | uuid | primary key
content | text | sentence text
source | text | source of sentence
created_at | timestamp | creation time

Example source:

- dailydictation
- manual input

---

## Table: vocabulary

Stores vocabulary dictionary.

Fields:

| field | type | description |
|-----|-----|-----|
id | uuid | primary key
word | text | vocabulary word
meaning | text | translated meaning
part_of_speech | text | noun / verb / adj
example | text | example sentence
created_at | timestamp | creation time

---

## Table: grammar

Stores grammar explanations.

Fields:

| field | type | description |
|-----|-----|-----|
id | uuid | primary key
pattern | text | grammar pattern
explanation | text | explanation
example | text | example sentence

Example record:

pattern  
need to + verb

explanation  
Used to express necessity.

---

## Table: user_vocabulary

Stores spaced repetition progress.

Fields:

| field | type | description |
|-----|-----|-----|
id | uuid | primary key
user_id | uuid | user reference
word_id | uuid | vocabulary reference
ease_factor | float | SM2 parameter
interval | integer | days until next review
repetition | integer | repetition count
next_review | timestamp | next review date

---

# 8. AI Analysis System

The AI service analyzes sentences.

Input:

Sentence text.

Example:

We need to allocate resources more efficiently.

Output format:
{
vocabulary: [
{ word, meaning, part_of_speech }
],
grammar: [
{ pattern, explanation }
],
paraphrase: [],
examples: []
}

Responsibilities:

- extract vocabulary
- detect grammar patterns
- provide explanations

AI provider:

OpenAI API.

---

# 9. Spaced Repetition Engine

Algorithm:

SM-2 (SuperMemo algorithm).

Purpose:

Optimize memory retention.

Review schedule example:

Day 1  
Day 3  
Day 7  
Day 14  
Day 30

Fields used:

- repetition
- interval
- ease_factor
- next_review

---

# 10. Frontend Interface

Frontend built using React or Vite.

Main pages:

Dashboard  
Vocabulary list  
Sentence history  
Review page

---

## Dashboard

Displays:

- learning statistics
- review reminders
- vocabulary growth

---

## Vocabulary Page

Displays:

- word
- meaning
- example
- review level

Features:

- search
- filter
- sort

---

## Sentence Page

Displays sentences analyzed by AI.

Each sentence shows:

- sentence text
- vocabulary extracted
- grammar explanation

---

## Review Page

Flashcard-style learning.

Front:

word

Back:

meaning  
example sentence

User chooses difficulty.

---

# 11. Infrastructure

Deployment architecture:
Cloud VPS
│
├── Backend (NestJS)
├── Frontend (React)
├── PostgreSQL
└── Redis


Redis is used for:

- caching
- background jobs
- review scheduling

---

# 12. Future Expansion

Possible features for later phases:

AI pronunciation analysis  
Speech shadowing  
Reading trainer  
News article vocabulary extraction  
Learning analytics dashboard  
Mobile app

---

# 13. MVP Scope

Minimum viable product includes:

Chrome Extension  
Sentence AI analysis  
Vocabulary storage  
Basic review system

Excluded from MVP:

- advanced analytics
- speech recognition
- mobile applications
- multi-user SaaS features

Focus:

Deliver a working personal learning system quickly.