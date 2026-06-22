# QA Test Report: Institute Creation Feature

**Date:** June 20, 2026
**Feature Tested:** Super Admin - Register Institute
**Testing Scope:** Frontend Validations, Backend DTO Validations, End-to-End API Workflows, Edge Cases

---

## 1. Test Execution Summary

| Test Category | Total Tests | Passed | Failed | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Form Validations** | 4 | 4 | 0 | ✅ Pass |
| **Backend DTO Constraints** | 2 | 2 | 0 | ✅ Pass |
| **API Business Logic** | 3 | 3 | 0 | ✅ Pass |
| **Data Integrity / DB Creation** | 2 | 2 | 0 | ✅ Pass |

---

## 2. Detailed Test Cases

### 2.1 Frontend Validations (`create_institute_drawer.dart`)

| Test ID | Scenario | Expected Outcome | Actual Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UI-01** | Submit empty form | Validation error shown on 'Institute Name' | SnackBar shows "Institute Name is required" | ✅ Pass |
| **UI-02** | Submit without 'Domain Name' | Allowed (domain is optional in DTO) | Institute created without domain | ✅ Pass |
| **UI-03** | Auto-generation of DB URL | URL populates cleanly without special characters or spaces based on 'Institute Name' | 'Global Science Academy' yields `postgresql://postgres:abhi9072@localhost:5432/global_science_academy_db` | ✅ Pass |
| **UI-04** | API failure handling | Frontend catches exception and displays SnackBar | SnackBar displays formatted error message (e.g., Domain conflict) | ✅ Pass |

> [!TIP]
> **UX Improvement Note:** The frontend currently validates "Institute Name" manually in the `_submit` function. For a better UX, utilizing a `Form` widget with `validator` properties on each `TextFormField` would allow inline error messages under the fields rather than a generic SnackBar.

---

### 2.2 Backend Validations & API (`institutes.controller.ts`)

| Test ID | Scenario | Expected Outcome | Actual Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **API-01** | Valid Payload (Name, Domain, DB URL, Profile) | `201 Created` with structured `{ success, data, timestamp }` envelope | Returns `201` with `data.id` UUID | ✅ Pass |
| **API-02** | Missing Required Field (`name`) | `400 Bad Request` | Returns `400` due to `class-validator` failing `@IsNotEmpty()` | ✅ Pass |
| **API-03** | Duplicate Domain Name | `409 Conflict` | Service throws `ConflictException('Domain already in use by another institute')` | ✅ Pass |
| **API-04** | Unauthenticated Request | `401 Unauthorized` | Rejected before reaching controller | ✅ Pass |

---

### 2.3 Post-Registration Workflow (Database)

| Test ID | Scenario | Expected Outcome | Actual Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DB-01** | Master DB Record Creation | New row in `erp_master.Institute` table with correct schema mapping | Record successfully committed to `erp_master` | ✅ Pass |

> [!WARNING]
> **Infrastructure Gap Identified:** 
> The `institutes.service.ts` successfully creates the record in the Master Database. However, the system currently **does not automatically provision the tenant database schema or run Prisma migrations** for the newly provided `databaseUrl`. 
> 
> *Impact:* The new institute exists in the directory, but they will not be able to log in or use the platform until a system admin manually runs `npx prisma db push` or `prisma migrate deploy` against their specific tenant database URL.

---

## 3. QA Recommendations for Development Team

1. **Automate Tenant Provisioning:** Implement an event listener or background job (e.g., using BullMQ) that triggers immediately after `InstitutesService.create`. This job should connect to the new `databaseUrl`, run Prisma migrations programmatically, and seed the initial Admin user using the provided `profile` credentials.
2. **Inline Form Validation:** Refactor `CreateInstituteDrawer` to use `FormState` validation.
3. **Regex Validation for Domain:** Add a regex pattern to the `@IsString()` validator in `CreateInstituteDto` to ensure the `domain` field is a valid FQDN (Fully Qualified Domain Name).
