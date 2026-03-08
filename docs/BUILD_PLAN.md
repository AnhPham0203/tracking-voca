# PHASE 4 — BUILD PLAN
English Learning System

This document defines the **implementation phase** of the project.  
The system will be built through a sequence of **small jobs (JOB-001 → JOB-010)**.

Each job must be completed before moving to the next one.

The purpose of this approach is to:

- reduce development complexity
- make AI coding easier
- allow iterative testing
- avoid architectural mistakes

---

# BUILD STRATEGY

The build process follows this order:

1. Backend foundation
2. Database layer
3. AI analysis service
4. API layer
5. Vocabulary management
6. Browser extension
7. Spaced repetition system
8. Frontend interface

---

# JOB LIST

JOB-001  Project foundation  
JOB-002  Database schema  
JOB-003  AI analysis service  
JOB-004  Sentence analysis API  
JOB-005  Vocabulary system  
JOB-006  Chrome Extension MVP  
JOB-007  Spaced repetition engine  
JOB-008  Dashboard  
JOB-009  Vocabulary page  
JOB-010  Review page

---

# JOB-001 — Project Foundation

## Goal

Initialize the backend project and basic module structure.

---

## Coder Prompt

Context:

You are building the backend for an English Learning System.

The system will support:

- sentence analysis
- vocabulary tracking
- spaced repetition review

Tech stack is predefined.

Technical Stack:

Node.js  
NestJS  
PostgreSQL  
Prisma ORM  
Redis (future use)

Do not implement business logic yet. Only project structure.

---

Task:

Initialize the backend project.

---

Requirements:

Create the following modules.

src

ai  
sentence  
vocabulary  
grammar  
review  
user

Each module must contain:

controller  
service  
module

Example structure:

sentence  
sentence.controller.ts  
sentence.service.ts  
sentence.module.ts

---

Additional setup:

Install dependencies:

- prisma
- @prisma/client
- class-validator
- class-transformer

Setup environment configuration.

Create `.env` variables:

DATABASE_URL  
OPENAI_API_KEY  
REDIS_URL

---

Expected Output

- NestJS project initialized
- Modules created
- Prisma installed
- Environment variables configured

Do NOT implement APIs yet.

---

# JOB-002 — Database Schema

## Goal

Design database schema using Prisma.

---

## Coder Prompt

Context:

Design the database schema for the English Learning System.

Use Prisma ORM with PostgreSQL.

---

Requirements:

Create the following models.

User

id  
email  
createdAt

Sentence

id  
content  
source  
createdAt

Vocabulary

id  
word  
meaning  
partOfSpeech  
example  
createdAt

Grammar

id  
pattern  
explanation  
example

UserVocabulary

id  
userId  
wordId  
easeFactor  
interval  
repetition  
nextReview

---

Relationships:

UserVocabulary

belongs to User  
belongs to Vocabulary

---

Expected Output

- Prisma schema
- Database migration
- Tables successfully created

---

# JOB-003 — AI Analysis Service

## Goal

Implement AI sentence analysis using OpenAI API.

---

## Coder Prompt

Context:

Implement an AI service that analyzes English sentences.

The service will call the OpenAI API.

---

Example Input

We need to allocate resources more efficiently.

---

Expected AI Output

{
vocabulary: [
{
word: "allocate",
meaning: "...",
partOfSpeech: "verb"
}
],
grammar: [
{
pattern: "need to + verb",
explanation: "express necessity"
}
]
}

---

Requirements

Create:

ai.service.ts

Function:

analyzeSentence(sentence: string)

The function must:

1. Send prompt to OpenAI
2. Parse JSON response
3. Return structured data

---

Constraints

AI must return JSON  
Validate response format

---

Expected Output

Working AI analysis service.

---

# JOB-004 — Sentence Analysis API

## Goal

Expose an API endpoint for sentence analysis.

---

## Coder Prompt

Create API endpoint.

Endpoint:

POST /api/analyze

---

Request body

{
sentence: string
}

---

Processing flow

Receive sentence  
Call AI service  
Extract vocabulary  
Store sentence  
Return analysis

---

Response example

{
sentence: "...",
vocabulary: [],
grammar: []
}

---

# JOB-005 — Vocabulary System

## Goal

Store and manage vocabulary extracted from sentences.

---

## Coder Prompt

Requirements:

When a sentence is analyzed:

- extract vocabulary
- store vocabulary if not exists
- link vocabulary to user

---

API:

GET /api/vocabulary

---

Return:

word  
meaning  
partOfSpeech  
example

---

# JOB-006 — Chrome Extension MVP

## Goal

Allow users to send selected text to the backend.

---

## Coder Prompt

Create Chrome extension.

Features:

Highlight sentence  
Right-click menu "Analyze Sentence"  
Send sentence to backend API

---

Request

POST /api/analyze

Body

{
sentence: selectedText
}

---

Display result

Popup showing:

- vocabulary
- grammar explanation

---

# JOB-007 — Spaced Repetition Engine

## Goal

Implement SM-2 spaced repetition algorithm.

---

## Coder Prompt

Input:

User review result.

Possible ratings:

Again  
Good  
Easy

---

Output

Update:

interval  
repetition  
easeFactor  
nextReview

---

# JOB-008 — Dashboard

## Goal

Create dashboard page.

---

## Coder Prompt

Display:

words learned today  
total vocabulary  
reviews due today

---

# JOB-009 — Vocabulary Page

## Goal

Create vocabulary management page.

---

## Coder Prompt

Features:

search word  
show meaning  
show example  
show review status

---

# JOB-010 — Review Page

## Goal

Create flashcard review interface.

---

## Coder Prompt

Review flow

show word  
user reveal answer  
user rate difficulty  
update review schedule

---

# BUILD EXECUTION RULE

Development must follow this order strictly.

JOB-001  
↓  
JOB-002  
↓  
JOB-003  
↓  
JOB-004  
↓  
JOB-005  
↓  
JOB-006  
↓  
JOB-007  
↓  
JOB-008  
↓  
JOB-009  
↓  
JOB-010

Do not skip steps.

Each job must be tested before continuing.