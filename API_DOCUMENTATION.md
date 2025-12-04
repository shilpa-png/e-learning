# EduLearn API Documentation

Complete API reference for the EduLearn e-learning platform.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All responses are in JSON format:

```json
{
  "message": "Success message",
  "data": {},
  "error": "Error message (if applicable)"
}
```

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Register a new student account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Errors:**
- 400: User already exists
- 400: Validation errors

---

### Login User

**POST** `/auth/login`

Authenticate and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Errors:**
- 400: Invalid credentials

---

### Get Current User

**GET** `/auth/me`

Get authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "profileImage": null,
  "bio": "Learning web development",
  "enrolledCourses": [],
  "badges": [],
  "level": 1,
  "points": 0,
  "streak": 0,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- 401: Unauthorized
- 401: Invalid token

---

## Course Endpoints

### Get All Courses

**GET** `/courses`

Get all published courses with optional filtering.

**Query Parameters:**
- `search` (string): Search by title or description
- `category` (string): Filter by category
- `level` (string): Filter by level (beginner/intermediate/advanced)

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Introduction to Web Development",
    "description": "Learn web development basics...",
    "category": "Web Development",
    "level": "beginner",
    "thumbnail": "https://...",
    "instructor": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Admin User",
      "email": "admin@elearning.com"
    },
    "modules": [],
    "totalEnrollments": 25,
    "rating": 4.5,
    "isPublished": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### Get Course Details

**GET** `/courses/:id`

Get detailed information about a specific course.

**Parameters:**
- `id` (string): Course ID

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Introduction to Web Development",
  "description": "Learn web development basics...",
  "category": "Web Development",
  "level": "beginner",
  "duration": 40,
  "thumbnail": "https://...",
  "instructor": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Admin User"
  },
  "modules": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "HTML Basics",
      "description": "Learn HTML fundamentals",
      "materials": [],
      "quizzes": []
    }
  ],
  "enrolledStudents": [],
  "totalEnrollments": 25,
  "rating": 4.5,
  "reviews": [],
  "isPublished": true
}
```

**Errors:**
- 404: Course not found

---

### Enroll in Course

**POST** `/courses/:id/enroll`

Enroll the authenticated student in a course.

**Parameters:**
- `id` (string): Course ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Enrolled successfully",
  "course": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Introduction to Web Development",
    ...
  }
}
```

**Errors:**
- 404: Course not found
- 400: Already enrolled in this course
- 401: Unauthorized

---

### Get Enrolled Courses

**GET** `/courses/student/enrolled`

Get all courses the student is enrolled in.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Introduction to Web Development",
    "description": "Learn web development basics...",
    ...
  }
]
```

**Errors:**
- 401: Unauthorized

---

## Module Endpoints

### Get Course Modules

**GET** `/modules/course/:courseId`

Get all modules for a course.

**Parameters:**
- `courseId` (string): Course ID

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "title": "HTML Basics",
    "description": "Learn HTML fundamentals",
    "courseId": "507f1f77bcf86cd799439011",
    "order": 1,
    "materials": [],
    "quizzes": [],
    "estimatedDuration": 120,
    "isPublished": true
  }
]
```

---

### Get Module Details

**GET** `/modules/:id`

Get detailed information about a module.

**Parameters:**
- `id` (string): Module ID

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "HTML Basics",
  "description": "Learn HTML fundamentals",
  "courseId": "507f1f77bcf86cd799439011",
  "order": 1,
  "materials": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "title": "HTML Introduction",
      "type": "note",
      ...
    }
  ],
  "quizzes": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "title": "HTML Basics Quiz",
      ...
    }
  ],
  "estimatedDuration": 120,
  "isPublished": true
}
```

---

## Material Endpoints

### Get Module Materials

**GET** `/materials/module/:moduleId`

Get all materials in a module.

**Parameters:**
- `moduleId` (string): Module ID

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "title": "HTML Introduction",
    "type": "note",
    "moduleId": "507f1f77bcf86cd799439013",
    "content": "<h2>What is HTML?</h2>...",
    "fileUrl": null,
    "videoEmbedUrl": null,
    "duration": 0,
    "order": 1,
    "isPublished": true
  }
]
```

---

### Get Material Details

**GET** `/materials/:id`

Get detailed information about a material.

**Parameters:**
- `id` (string): Material ID

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "title": "HTML Introduction",
  "type": "note",
  "moduleId": "507f1f77bcf86cd799439013",
  "content": "<h2>What is HTML?</h2>...",
  "fileUrl": null,
  "videoEmbedUrl": "https://www.youtube.com/embed/...",
  "duration": 15,
  "order": 1,
  "isPublished": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### Mark Material as Completed

**POST** `/materials/:id/complete`

Mark a material as completed by the student.

**Parameters:**
- `id` (string): Material ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Material marked as completed",
  "progress": {
    "_id": "507f1f77bcf86cd799439016",
    "studentId": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439010",
    "moduleProgress": [
      {
        "moduleId": "507f1f77bcf86cd799439013",
        "completedMaterials": ["507f1f77bcf86cd799439014"],
        "completedQuizzes": [],
        "modulePercentage": 50
      }
    ],
    "coursePercentage": 25,
    "totalMaterialsCompleted": 1
  }
}
```

**Errors:**
- 404: Material not found
- 401: Unauthorized

---

## Quiz Endpoints

### Get Module Quizzes

**GET** `/quizzes/module/:moduleId`

Get all quizzes in a module.

**Parameters:**
- `moduleId` (string): Module ID

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "title": "HTML Basics Quiz",
    "description": "Test your HTML knowledge",
    "moduleId": "507f1f77bcf86cd799439013",
    "courseId": "507f1f77bcf86cd799439011",
    "questions": [],
    "totalPoints": 10,
    "passingScore": 60,
    "timeLimit": 30,
    "isPublished": true
  }
]
```

---

### Get Quiz Details

**GET** `/quizzes/:id`

Get quiz details (without correct answers for students).

**Parameters:**
- `id` (string): Quiz ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "title": "HTML Basics Quiz",
  "description": "Test your HTML knowledge",
  "moduleId": "507f1f77bcf86cd799439013",
  "courseId": "507f1f77bcf86cd799439011",
  "questions": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "type": "mcq",
      "question": "What does HTML stand for?",
      "options": [
        { "text": "HyperText Markup Language" },
        { "text": "High Tech Modern Language" },
        { "text": "Home Tool Markup Language" },
        { "text": "Hyperlinks and Text Markup Language" }
      ],
      "points": 1,
      "explanation": "HTML stands for HyperText Markup Language..."
    }
  ],
  "totalPoints": 10,
  "passingScore": 60,
  "timeLimit": 30,
  "showCorrectAnswers": true,
  "allowRetakes": true,
  "isPublished": true
}
```

---

### Submit Quiz

**POST** `/quizzes/:id/submit`

Submit quiz answers and get auto-graded results.

**Parameters:**
- `id` (string): Quiz ID

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "answers": [
    "HyperText Markup Language",
    "False",
    "<p>"
  ],
  "timeTaken": 1200
}
```

**Response (200):**
```json
{
  "message": "Quiz submitted successfully",
  "score": 3,
  "totalPoints": 3,
  "percentage": 100,
  "passed": true,
  "answers": [
    {
      "questionId": "507f1f77bcf86cd799439016",
      "selectedAnswer": "HyperText Markup Language",
      "isCorrect": true,
      "pointsEarned": 1
    }
  ]
}
```

**Errors:**
- 404: Quiz not found
- 400: Maximum attempts reached
- 401: Unauthorized

---

### Get Quiz Scores

**GET** `/quizzes/student/:studentId/scores`

Get all quiz scores for a student.

**Parameters:**
- `studentId` (string): Student ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439017",
    "studentId": "507f1f77bcf86cd799439011",
    "quizId": {
      "_id": "507f1f77bcf86cd799439015",
      "title": "HTML Basics Quiz"
    },
    "moduleId": {
      "_id": "507f1f77bcf86cd799439013",
      "title": "HTML Basics"
    },
    "courseId": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Introduction to Web Development"
    },
    "score": 3,
    "totalPoints": 3,
    "percentage": 100,
    "passed": true,
    "timeTaken": 1200,
    "attemptNumber": 1,
    "submittedAt": "2024-01-15T10:30:00Z"
  }
]
```

---

## Progress Endpoints

### Get Course Progress

**GET** `/progress/course/:courseId`

Get student's progress in a specific course.

**Parameters:**
- `courseId` (string): Course ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439016",
  "studentId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439011",
  "moduleProgress": [
    {
      "moduleId": "507f1f77bcf86cd799439013",
      "completedMaterials": ["507f1f77bcf86cd799439014"],
      "completedQuizzes": ["507f1f77bcf86cd799439015"],
      "modulePercentage": 100
    }
  ],
  "coursePercentage": 100,
  "totalMaterialsCompleted": 1,
  "totalQuizzesAttempted": 1,
  "averageQuizScore": 100,
  "certificateEarned": true,
  "certificateEarnedAt": "2024-01-15T11:30:00Z",
  "enrolledAt": "2024-01-15T10:00:00Z",
  "completedAt": "2024-01-15T11:30:00Z"
}
```

---

### Get All Student Progress

**GET** `/progress/student/all`

Get student's progress in all enrolled courses.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439016",
    "studentId": "507f1f77bcf86cd799439011",
    "courseId": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Introduction to Web Development",
      "thumbnail": "https://..."
    },
    "moduleProgress": [],
    "coursePercentage": 50,
    "totalMaterialsCompleted": 2,
    "totalQuizzesAttempted": 1,
    "averageQuizScore": 85,
    "certificateEarned": false
  }
]
```

---

### Get Course Leaderboard

**GET** `/progress/leaderboard/:courseId`

Get top 10 performers in a course.

**Parameters:**
- `courseId` (string): Course ID

**Response (200):**
```json
[
  {
    "studentId": "507f1f77bcf86cd799439011",
    "studentName": "John Doe",
    "studentEmail": "john@example.com",
    "totalScore": 100,
    "averagePercentage": 95.5,
    "attemptCount": 3
  },
  {
    "studentId": "507f1f77bcf86cd799439012",
    "studentName": "Jane Smith",
    "studentEmail": "jane@example.com",
    "totalScore": 95,
    "averagePercentage": 90.2,
    "attemptCount": 2
  }
]
```

---

## User Endpoints

### Get User Profile

**GET** `/users/profile`

Get authenticated user's profile with enrolled courses.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "profileImage": null,
  "bio": "Learning web development",
  "enrolledCourses": [
    {
      "courseId": {
        "_id": "507f1f77bcf86cd799439010",
        "title": "Introduction to Web Development"
      },
      "enrolledAt": "2024-01-15T10:00:00Z"
    }
  ],
  "badges": [],
  "level": 1,
  "points": 0,
  "streak": 0,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### Update User Profile

**PUT** `/users/profile`

Update user's profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Doe",
  "bio": "Learning web development",
  "profileImage": "https://..."
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Learning web development",
    "profileImage": "https://..."
  }
}
```

---

### Submit Module Feedback

**POST** `/users/feedback`

Submit feedback for a module.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "moduleId": "507f1f77bcf86cd799439013",
  "courseId": "507f1f77bcf86cd799439011",
  "rating": 5,
  "comment": "Great module! Very helpful."
}
```

**Response (201):**
```json
{
  "message": "Feedback submitted successfully",
  "feedback": {
    "_id": "507f1f77bcf86cd799439018",
    "studentId": "507f1f77bcf86cd799439011",
    "moduleId": "507f1f77bcf86cd799439013",
    "courseId": "507f1f77bcf86cd799439011",
    "rating": 5,
    "comment": "Great module! Very helpful.",
    "createdAt": "2024-01-15T12:00:00Z"
  }
}
```

---

### Get Module Feedback

**GET** `/users/feedback/:moduleId`

Get all feedback for a module.

**Parameters:**
- `moduleId` (string): Module ID

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439018",
    "studentId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "profileImage": null
    },
    "moduleId": "507f1f77bcf86cd799439013",
    "courseId": "507f1f77bcf86cd799439011",
    "rating": 5,
    "comment": "Great module! Very helpful.",
    "createdAt": "2024-01-15T12:00:00Z"
  }
]
```

---

## Admin Endpoints

### Create Course

**POST** `/admin/courses`

Create a new course (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Advanced JavaScript",
  "description": "Learn advanced JavaScript concepts",
  "category": "Programming",
  "level": "advanced",
  "thumbnail": "https://..."
}
```

**Response (201):**
```json
{
  "message": "Course created successfully",
  "course": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Advanced JavaScript",
    "description": "Learn advanced JavaScript concepts",
    "category": "Programming",
    "level": "advanced",
    "instructor": "507f1f77bcf86cd799439012",
    "modules": [],
    "enrolledStudents": [],
    "totalEnrollments": 0,
    "isPublished": false
  }
}
```

**Errors:**
- 403: Admin access required

---

### Update Course

**PUT** `/admin/courses/:id`

Update course details (admin only).

**Parameters:**
- `id` (string): Course ID

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Advanced JavaScript",
  "description": "Updated description",
  "isPublished": true
}
```

**Response (200):**
```json
{
  "message": "Course updated successfully",
  "course": { ... }
}
```

---

### Delete Course

**DELETE** `/admin/courses/:id`

Delete a course and all associated content (admin only).

**Parameters:**
- `id` (string): Course ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Course deleted successfully"
}
```

---

### Create Module

**POST** `/admin/modules`

Create a new module (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Advanced Concepts",
  "description": "Learn advanced concepts",
  "courseId": "507f1f77bcf86cd799439011",
  "order": 1
}
```

**Response (201):**
```json
{
  "message": "Module created successfully",
  "module": { ... }
}
```

---

### Create Material

**POST** `/admin/materials`

Create a new material (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Advanced Concepts Note",
  "type": "note",
  "moduleId": "507f1f77bcf86cd799439013",
  "content": "<h2>Advanced Concepts</h2>...",
  "order": 1
}
```

**Response (201):**
```json
{
  "message": "Material created successfully",
  "material": { ... }
}
```

---

### Create Quiz

**POST** `/admin/quizzes`

Create a new quiz (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Advanced Quiz",
  "description": "Test advanced knowledge",
  "moduleId": "507f1f77bcf86cd799439013",
  "courseId": "507f1f77bcf86cd799439011",
  "questions": [
    {
      "type": "mcq",
      "question": "What is closure?",
      "options": [
        { "text": "A function inside another function", "isCorrect": true },
        { "text": "A loop", "isCorrect": false }
      ],
      "correctAnswer": "A function inside another function",
      "points": 1
    }
  ],
  "passingScore": 70,
  "timeLimit": 30
}
```

**Response (201):**
```json
{
  "message": "Quiz created successfully",
  "quiz": { ... }
}
```

---

### Get Course Analytics

**GET** `/admin/analytics/course/:courseId`

Get analytics for a specific course (admin only).

**Parameters:**
- `courseId` (string): Course ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "courseTitle": "Introduction to Web Development",
  "totalEnrollments": 25,
  "averageProgress": 65,
  "averageQuizScore": 78,
  "totalQuizAttempts": 45,
  "certificatesEarned": 8
}
```

---

### Get All Courses (Admin)

**GET** `/admin/courses/all`

Get all courses including unpublished (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Introduction to Web Development",
    "description": "Learn web development basics...",
    "category": "Web Development",
    "level": "beginner",
    "instructor": { ... },
    "modules": [],
    "totalEnrollments": 25,
    "isPublished": true
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Token is not valid"
}
```

### 403 Forbidden
```json
{
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "message": "Course not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Internal server error details"
}
```

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per user

---

## Pagination

Not currently implemented. Recommended for large datasets:
- Add `page` and `limit` query parameters
- Return `total`, `page`, `limit` in response

---

## Versioning

Current API version: v1

Future versions will be available at `/api/v2`, `/api/v3`, etc.

---

## Webhooks

Not currently implemented. Recommended for:
- Course completion notifications
- Quiz submission events
- User enrollment events

---

## Testing

Use the following tools to test the API:

- **Postman**: https://www.postman.com/
- **Insomnia**: https://insomnia.rest/
- **Thunder Client**: VS Code extension
- **cURL**: Command line tool

Example cURL request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@elearning.com","password":"admin123"}'
```

---

## Support

For API issues or questions, please refer to the main README.md or create an issue in the repository.
