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
- **courseNumber**: An optional string for the course number  
- **courseTitle**: An optional string for the course title  
- **departmentId**: A string field referencing a `Departments.id`  

**Relationships**  
- **department**: Optional many‐to‐one relationship with `Departments`. The foreign key is `departmentId`.  
- **CourseOutcomes**: One‐to‐many relationship with `CourseOutcomes`.  
- **Curriculum**: One‐to‐many relationship with `Curriculum`.  
- **AssessmentScore**: One‐to‐many relationship with `AssessmentScore`.

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
- **createdAt**: Date/time record was created (auto‐generated)  
- **updatedAt**: Date/time record was last updated (auto‐generated)  
- **deletedAt**: Date/time record was soft‐deleted  
- **PathwayTitle**: An optional string for pathway name/title  
- **departmentId**: A string field referencing a `Departments.id`  

**Relationships**  
- **department**: Optional many‐to‐one relationship with `Departments`. The foreign key is `departmentId`.  
- **outcomes**: One‐to‐many relationship with `PathwayOutcomes`.  
- **curriculum**: One‐to‐many relationship with `Curriculum`.

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

## AssessmentScore

**Fields**  
- **id**: Primary key (UUID)  
- **createdAt**: Date/time record was created (auto‐generated)  
- **updatedAt**: Date/time record was last updated (auto‐generated)  
- **deletedAt**: Date/time record was soft‐deleted  
- **StudentID**: String referencing a `StudentInfo.id`  
- **AssignmentID**: An optional string  
- **CourseID**: String referencing a `CourseInfo.id`  
- **CourseOutcome**: String referencing a `CourseOutcomes.id`  
- **Score**: An optional integer score  

**Relationships**  
- **student**: Optional many‐to‐one relationship with `StudentInfo` (via `StudentID`).  
- **course**: Optional many‐to‐one relationship with `CourseInfo` (via `CourseID`).  
- **courseOutcomes**: Optional many‐to‐one relationship with `CourseOutcomes` (via `CourseOutcome`).