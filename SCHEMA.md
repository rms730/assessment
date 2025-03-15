# Prisma Schema Explanation

This document explains each model in the Prisma schema and highlights the key relationships between them.

---

## StudentInfo

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Date/time record was created (auto‐generated)
- **updatedAt**: Date/time record was last updated (auto‐generated)
- **deletedAt**: Date/time record was soft‐deleted
- **studentID**: An optional string identifying the student

**Relationships**
- **AssessmentScore**: One‐to‐many with the `AssessmentScore` table. Each `AssessmentScore` may point back to a single `StudentInfo` (via the `StudentID` foreign key).

---

## CourseInfo

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Date/time record was created (auto‐generated)
- **updatedAt**: Date/time record was last updated (auto‐generated)
- **deletedAt**: Date/time record was soft‐deleted
- **courseNumber**: String for the course number
- **courseTitle**: String for the course title
- **departmentId**: References `Departments.id`

**Relationships**
- **department**: Many‐to‐one with `Departments` (`departmentId`).
- **CourseOutcomes**: One‐to‐many with `CourseOutcomes`.
- **Curriculum**: One‐to‐many with `Curriculum`.
- **AssessmentScore**: One‐to‐many with `AssessmentScore`.
- **prerequisites**: Courses that must be taken before this course.
- **isPrerequisiteFor**: Courses for which this course is a prerequisite.
- **sessionCourses**: Many‐to‐many with `Session` via `SessionCourse`.

---

## CoursePrerequisite

**Fields**
- **id**: Primary key (UUID)
- **courseId**: The course requiring a prerequisite
- **prerequisiteId**: The prerequisite course
- **canBeConcurrent**: Boolean, indicates if prerequisite can be taken concurrently.

**Relationships**
- **course**: The course requiring a prerequisite.
- **prerequisite**: The prerequisite course.

---

## Departments

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Date/time record was created (auto‐generated)
- **updatedAt**: Date/time record was last updated (auto‐generated)
- **deletedAt**: Date/time record was soft‐deleted
- **Department**: An optional string for the department name
- **Abrev**: An optional string abbreviation

**Relationships**
- **courses**: One‐to‐many relationship with `CourseInfo`.
- **pathways**: One‐to‐many relationship with `Pathways`.

---

## Pathways

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Auto‐generated timestamp
- **updatedAt**: Auto‐generated timestamp
- **deletedAt**: Soft-delete timestamp
- **PathwayTitle**: Title of the pathway
- **departmentId**: References `Departments.id`

**Relationships**
- **department**: Many‐to‐one with `Departments`.
- **outcomes**: One‐to‐many with `PathwayOutcomes`.
- **curriculum**: One‐to‐many with `Curriculum`.
- **sessions**: Ordered sessions within the pathway.

---

## PathwaySession

**Fields**
- **id**: Primary key (UUID)
- **pathwayId**: References `Pathways.id`
- **sessionId**: References `Session.id`
- **order**: Defines order of sessions in the pathway

**Relationships**
- **pathway**: Many‐to‐one with `Pathways`.
- **session**: Many‐to‐one with `Session`.

---

## Curriculum

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Date/time record was created (auto‐generated)
- **updatedAt**: Date/time record was last updated (auto‐generated)
- **deletedAt**: Date/time record was soft‐deleted
- **Pathway**: String referencing a `Pathways.id`
- **Course**: String referencing a `CourseInfo.id`

**Relationships**
- **pathway**: Optional many‐to‐one relationship with `Pathways`. The foreign key is `Pathway`.
- **course**: Optional many‐to‐one relationship with `CourseInfo`. The foreign key is `Course`.

---

## CourseOutcomes

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Date/time record was created (auto‐generated)
- **updatedAt**: Date/time record was last updated (auto‐generated)
- **deletedAt**: Date/time record was soft‐deleted
- **CourseID**: A string referencing a `CourseInfo.id`
- **OutcomeTitle**: An optional string for outcome title
- **OutcomeDescription**: An optional string for outcome description

**Relationships**
- **course**: Optional many‐to‐one relationship with `CourseInfo`. The foreign key is `CourseID`.

---

## PathwayOutcomes

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Date/time record was created (auto‐generated)
- **updatedAt**: Date/time record was last updated (auto‐generated)
- **deletedAt**: Date/time record was soft‐deleted
- **PathwayID**: A string referencing a `Pathways.id`
- **PathOutcomeTitle**: An optional string for pathway outcome title
- **PathOutcomeDesc**: An optional string for pathway outcome description

**Relationships**
- **pathway**: Optional many‐to‐one relationship with `Pathways`. The foreign key is `PathwayID`.

---

## InstitutionalGoals

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Date/time record was created (auto‐generated)
- **updatedAt**: Date/time record was last updated (auto‐generated)
- **deletedAt**: Date/time record was soft‐deleted
- **IGTitle**: An optional string
- **IGDescription**: An optional string

**Relationships**
- Referenced as an optional foreign key in `OutcomeMapping`.

---

## GECC

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Date/time record was created (auto‐generated)
- **updatedAt**: Date/time record was last updated (auto‐generated)
- **deletedAt**: Date/time record was soft‐deleted
- **GECCTitle**: An optional string
- **GECCDesc**: An optional string

**Relationships**
- Referenced as an optional foreign key in `OutcomeMapping`.

---

## OutcomeMapping

**Fields**
- **id**: Primary key (UUID)
- **createdAt**: Date/time record was created (auto‐generated)
- **updatedAt**: Date/time record was last updated (auto‐generated)
- **deletedAt**: Date/time record was soft‐deleted
- **CourseOutcome**: String referencing `CourseOutcomes.id`
- **PathwayOutcome**: String referencing `PathwayOutcomes.id`
- **GECC**: String referencing `GECC.id`
- **IG**: String referencing `InstitutionalGoals.id`

**Relationships**
- **courseOutcome**: Optional many‐to‐one relationship with `CourseOutcomes`.
- **pathwayOutcome**: Optional many‐to‐one relationship with `PathwayOutcomes`.
- **gecc**: Optional many‐to‐one relationship with `GECC`.
- **ig**: Optional many‐to‐one relationship with `InstitutionalGoals`.

---

## Session

**Fields**
- **id**: Primary key (UUID)
- **sessionType**: Enum (SEMESTER, QUARTER, TRIMESTER)
- **sessionOrder**: Order within the pathway
- **title**: Name/title of the session

**Relationships**
- **pathwaySessions**: Many‐to‐many with `Pathways` via `PathwaySession`.
- **sessionCourses**: Many‐to‐many with `CourseInfo` via `SessionCourse`.

---

## SessionCourse

**Fields**
- **id**: Primary key (UUID)
- **sessionId**: References `Session.id`
- **courseId**: References `CourseInfo.id`

**Relationships**
- **session**: Many‐to‐one with `Session`.
- **course**: Many‐to‐one with `CourseInfo`.
