# EduLearn - Quick Reference Guide

## Quick Start (Copy-Paste Commands)

### 1. Initial Setup

```bash
# Navigate to project
cd windsurf-project

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Copy environment template
cp .env.example .env
```

### 2. Configure MongoDB

**Option A: Local MongoDB**
```bash
# Windows - Start MongoDB
mongod

# Mac - Start MongoDB
brew services start mongodb-community

# Linux - Start MongoDB
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `MONGODB_URI` in `.env`

### 3. Seed Sample Data

```bash
node seed.js
```

### 4. Start Application

**Terminal 1 - Backend:**
```bash
npm run dev
# or
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### 5. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## Test Credentials

```
Admin Account:
  Email: admin@elearning.com
  Password: admin123

Student Accounts:
  Email: john@example.com
  Password: password123

  Email: jane@example.com
  Password: password123
```

## Common Tasks

### Create a New Course (Admin)

1. Login as admin
2. Go to `/admin`
3. Click "New Course"
4. Fill in details:
   - Title
   - Description
   - Category
   - Level
   - Thumbnail URL
5. Click "Create Course"

### Add Module to Course

```javascript
// API Call
POST /api/admin/modules
{
  "title": "Module Title",
  "description": "Module Description",
  "courseId": "course_id_here",
  "order": 1
}
```

### Add Material to Module

```javascript
// API Call
POST /api/admin/materials
{
  "title": "Material Title",
  "type": "note", // or "video", "pdf", "image"
  "moduleId": "module_id_here",
  "content": "<h2>Content</h2>", // for notes
  "videoEmbedUrl": "https://youtube.com/embed/...", // for videos
  "order": 1
}
```

### Create Quiz

```javascript
// API Call
POST /api/admin/quizzes
{
  "title": "Quiz Title",
  "description": "Quiz Description",
  "moduleId": "module_id_here",
  "courseId": "course_id_here",
  "questions": [
    {
      "type": "mcq",
      "question": "Question text?",
      "options": [
        { "text": "Option 1", "isCorrect": true },
        { "text": "Option 2", "isCorrect": false }
      ],
      "correctAnswer": "Option 1",
      "points": 1
    }
  ],
  "passingScore": 60,
  "timeLimit": 30
}
```

## File Locations

### Backend Models
```
models/
├── User.js          - User schema
├── Course.js        - Course schema
├── Module.js        - Module schema
├── Material.js      - Material schema
├── Quiz.js          - Quiz schema
├── QuizScore.js     - Quiz results
├── Progress.js      - Progress tracking
└── Feedback.js      - Module feedback
```

### Backend Routes
```
routes/
├── auth.js          - Authentication
├── courses.js       - Course endpoints
├── modules.js       - Module endpoints
├── materials.js     - Material endpoints
├── quizzes.js       - Quiz endpoints
├── progress.js      - Progress endpoints
├── users.js         - User endpoints
└── admin.js         - Admin endpoints
```

### Frontend Pages
```
client/src/pages/
├── HomePage.js              - Home page
├── LoginPage.js             - Login
├── RegisterPage.js          - Registration
├── CoursesPage.js           - Course listing
├── CourseDetailPage.js      - Course details
├── StudentDashboard.js      - Student dashboard
├── ProgressDashboard.js     - Progress analytics
├── NotesViewer.js           - Notes viewer
├── VideoPlayer.js           - Video player
├── QuizPage.js              - Quiz interface
└── AdminDashboard.js        - Admin panel
```

## Environment Variables

```env
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/elearning
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development

# Frontend (client/.env)
REACT_APP_API_URL=http://localhost:5000
```

## API Endpoints Summary

### Authentication
```
POST   /api/auth/register      - Register
POST   /api/auth/login         - Login
GET    /api/auth/me            - Get current user
```

### Courses
```
GET    /api/courses            - Get all courses
GET    /api/courses/:id        - Get course details
POST   /api/courses/:id/enroll - Enroll in course
GET    /api/courses/student/enrolled - Get enrolled courses
```

### Materials
```
GET    /api/materials/module/:moduleId - Get materials
GET    /api/materials/:id              - Get material
POST   /api/materials/:id/complete     - Mark complete
```

### Quizzes
```
GET    /api/quizzes/module/:moduleId   - Get quizzes
GET    /api/quizzes/:id                - Get quiz
POST   /api/quizzes/:id/submit         - Submit quiz
GET    /api/quizzes/student/:id/scores - Get scores
```

### Progress
```
GET    /api/progress/course/:courseId        - Get progress
GET    /api/progress/student/all             - Get all progress
GET    /api/progress/leaderboard/:courseId   - Get leaderboard
```

### Admin
```
POST   /api/admin/courses              - Create course
PUT    /api/admin/courses/:id          - Update course
DELETE /api/admin/courses/:id          - Delete course
POST   /api/admin/modules              - Create module
POST   /api/admin/materials            - Create material
POST   /api/admin/quizzes              - Create quiz
GET    /api/admin/analytics/course/:id - Get analytics
```

## Database Collections

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  enrolledCourses: Array,
  badges: Array,
  level: Number,
  points: Number,
  streak: Number
}
```

### Course
```javascript
{
  title: String,
  description: String,
  category: String,
  level: String,
  instructor: ObjectId,
  modules: Array,
  enrolledStudents: Array,
  totalEnrollments: Number,
  isPublished: Boolean
}
```

### Progress
```javascript
{
  studentId: ObjectId,
  courseId: ObjectId,
  moduleProgress: Array,
  coursePercentage: Number,
  totalMaterialsCompleted: Number,
  averageQuizScore: Number,
  certificateEarned: Boolean
}
```

## Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is running
2. Check MONGODB_URI in .env
3. For Atlas: verify connection string
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000

Solution:
1. Change PORT in .env
2. Or kill process: lsof -ti:5000 | xargs kill -9
```

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS policy

Solution:
1. Ensure backend is running on port 5000
2. Check REACT_APP_API_URL in client/.env
3. Verify CORS is enabled in server.js
```

### Module Not Found
```
Error: Cannot find module 'express'

Solution:
1. Run: npm install
2. Delete node_modules and package-lock.json
3. Run: npm install again
```

## Useful Commands

### Backend
```bash
npm start              # Production mode
npm run dev           # Development with auto-reload
node seed.js          # Seed database
```

### Frontend
```bash
npm start             # Start dev server
npm run build         # Create production build
npm test              # Run tests
```

### Database
```bash
mongosh               # Open MongoDB shell
use elearning         # Switch to database
db.users.find()       # View users
db.courses.find()     # View courses
db.dropDatabase()     # Delete database
```

## Testing with Postman

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Get Courses
```
GET http://localhost:5000/api/courses
```

### 4. Enroll in Course
```
POST http://localhost:5000/api/courses/{courseId}/enroll
Authorization: Bearer {token}
```

### 5. Submit Quiz
```
POST http://localhost:5000/api/quizzes/{quizId}/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "answers": ["Answer 1", "Answer 2", "Answer 3"],
  "timeTaken": 1200
}
```

## Project Structure Overview

```
windsurf-project/
├── Backend (Node.js + Express)
│   ├── server.js
│   ├── models/ (8 files)
│   ├── routes/ (8 files)
│   ├── middleware/
│   ├── config/
│   └── seed.js
│
├── Frontend (React)
│   └── client/
│       ├── src/
│       │   ├── pages/ (11 files)
│       │   ├── components/
│       │   ├── App.js
│       │   └── index.js
│       └── public/
│
└── Documentation
    ├── README.md
    ├── SETUP_GUIDE.md
    ├── API_DOCUMENTATION.md
    ├── PROJECT_SUMMARY.md
    └── QUICK_REFERENCE.md
```

## Performance Tips

### Frontend
- Use React DevTools for debugging
- Check Network tab in browser DevTools
- Monitor bundle size with `npm run build`

### Backend
- Use MongoDB Compass for database visualization
- Check server logs for errors
- Use Postman for API testing

## Security Checklist

- [ ] Change JWT_SECRET in .env
- [ ] Use strong MongoDB password
- [ ] Enable HTTPS in production
- [ ] Set CORS properly for production domain
- [ ] Use environment variables for secrets
- [ ] Validate all user inputs
- [ ] Implement rate limiting
- [ ] Use HTTPS for MongoDB Atlas

## Deployment Checklist

### Backend (Heroku)
- [ ] Create Heroku account
- [ ] Set environment variables
- [ ] Deploy to Heroku
- [ ] Test API endpoints

### Frontend (Netlify)
- [ ] Build React app: `npm run build`
- [ ] Deploy build folder to Netlify
- [ ] Update REACT_APP_API_URL

## Resources

- **MongoDB**: https://docs.mongodb.com/
- **Express**: https://expressjs.com/
- **React**: https://react.dev/
- **Mongoose**: https://mongoosejs.com/
- **JWT**: https://jwt.io/

## Support

For detailed information, see:
- README.md - Main documentation
- SETUP_GUIDE.md - Installation guide
- API_DOCUMENTATION.md - API reference
- PROJECT_SUMMARY.md - Project overview

---

**Happy Learning! 📚**
