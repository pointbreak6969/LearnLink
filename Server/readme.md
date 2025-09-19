# LearnLink Server API Documentation

This document describes all available API endpoints for the LearnLink backend server, including authentication, classroom, resource, and profile management. All endpoints are prefixed by `/api/v1/` (or your configured base path).

---

## Authentication & User Routes

### POST `/register`
**Register a new user.**
- **Body:** `{ fullName: string, email: string, password: string }`
- **Returns:** User object (id, fullName, email) and sets cookies for access/refresh tokens.

### POST `/login`
**Login a user.**
- **Body:** `{ email: string, password: string }`
- **Returns:** User object (id, fullName, email) and sets cookies for access/refresh tokens.

### POST `/logout`
**Logout the current user.**
- **Headers:** Requires valid access token (cookie)
- **Returns:** Success message, clears cookies.

### GET `/me`
**Get the current authenticated user's info.**
- **Headers:** Requires valid access token (cookie)
- **Returns:** User object.

### GET `/getUserAllClassrooms`
**Get all classrooms the current user is a member of.**
- **Headers:** Requires valid access token (cookie)
- **Returns:** Array of classroom objects.

### POST `/refreshAccessToken`
**Refresh the access token using a valid refresh token.**
- **Body or Cookie:** `{ refreshToken: string }` or cookie
- **Returns:** New access and refresh tokens as cookies.

---

## Classroom Routes

### POST `/classroom/createClassroom`
**Create a new classroom.**
- **Headers:** Requires valid access token
- **Body:** `{ classroomName: string, universityName: string, facultyName: string }`
- **Returns:** Classroom object.

### PATCH `/classroom/updateClassroom/:id`
**Update classroom details.**
- **Headers:** Requires valid access token
- **Body:** `{ newClassroomName?: string, newFacultyName?: string, newUniversityName?: string }`
- **Returns:** Updated classroom object.

### DELETE `/classroom/deleteClassroom/:id`
**Delete a classroom.**
- **Headers:** Requires valid access token
- **Returns:** Success message.

### GET `/classroom/getAllClassrooms`
**Get all classrooms.**
- **Returns:** Array of classroom objects.

### GET `/classroom/getClassroomByQuery`
**Get classrooms by university and faculty.**
- **Query:** `universityName`, `facultyName`
- **Returns:** Array of classroom objects.

### POST `/classroom/joinClassroom` or `/classroom/joinClassroom/:code`
**Join a classroom by code.**
- **Headers:** Requires valid access token
- **Body:** `{ code: string }` (if not in URL)
- **Returns:** Success message or classroom object.

### GET `/classroom/getClassroomDetails/:classroomId`
**Get details of a specific classroom.**
- **Headers:** Requires valid access token
- **Returns:** Classroom object.

### GET `/classroom/getSuggestedClassrooms` or `/classroom/getPublicClassrooms`
**Get suggested/public classrooms.**
- **Headers:** Requires valid access token
- **Returns:** Array of classroom objects.

### GET `/classroom/getClassroomUsers/:classroomId`
**Get users in a classroom.**
- **Headers:** Requires valid access token
- **Returns:** Array of user objects.

### POST `/classroom/request`
**Request to join a classroom.**
- **Headers:** Requires valid access token
- **Body:** `{ classroomId: string }`
- **Returns:** Success message.

### GET `/classroom/getJoinRequests/:id`
**Get join requests for a classroom (admin only).**
- **Headers:** Requires valid access token
- **Returns:** Array of join request objects.

### POST `/classroom/userRequestToadmin`
**User requests admin for something (custom logic).**
- **Headers:** Requires valid access token
- **Body:** Custom fields
- **Returns:** Success message.

---

## Resource Routes

### POST `/resources/add`
**Add/upload resources to a classroom.**
- **Headers:** Requires valid access token
- **FormData:** `resource` (file, up to 25), `title`, `text`, `classroomId`
- **Returns:** Resource object(s).

### GET `/resources/get`
**Get resources by title.**
- **Query:** `title`
- **Returns:** Array of resource objects.

### DELETE `/resources/delete/:id`
**Delete a resource.**
- **Headers:** Requires valid access token
- **Returns:** Success message.

### GET `/resources/getUserUploadedResources`
**Get resources uploaded by the current user.**
- **Headers:** Requires valid access token
- **Returns:** Array of resource objects.

### GET `/resources/getClassroomResources`
**Get all resources for a classroom.**
- **Headers:** Requires valid access token
- **Query:** `classroomId`
- **Returns:** Array of resource objects.

---

## Profile Routes

### POST `/profile/complete`
**Complete or update user profile.**
- **Headers:** Requires valid access token
- **FormData:** `profilePicture` (file), `phone`, `location`, `university`, `college`
- **Returns:** Profile object.

### GET `/profile/get`
**Get the current user's profile.**
- **Headers:** Requires valid access token
- **Returns:** Profile object.

### PATCH `/profile/updateProfile`
**Update user profile.**
- **Headers:** Requires valid access token
- **FormData:** `newProfilePicture` (file, optional), other profile fields
- **Returns:** Updated profile object.

---

## Notes
- All endpoints that require authentication expect a valid JWT access token in cookies.
- File upload endpoints require `multipart/form-data` encoding.
- Error responses are returned in the format: `{ statusCode, message, data }`.
- Some endpoints may return additional fields depending on business logic.

---

For more details, see the controller files in `/controllers` and the route files in `/routes`.
