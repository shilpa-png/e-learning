# EduLearn - E-Learning Platform

A comprehensive, modern e-learning platform built with Node.js, Express, MongoDB, and React. Students can learn through notes and videos, take quizzes, and track their progress. Admins can manage courses, modules, materials, and quizzes.

## Features

### Student Features
- **User Authentication**: Secure registration and login with JWT
- **Course Enrollment**: Browse and enroll in courses
- **Learning Materials**: Access notes, videos, PDFs, and images
- **Progress Tracking**: Automatic progress calculation based on completed materials and quizzes
- **Quizzes & Tests**: Multiple question types (MCQ, True/False, Fill-in-the-blank)
- **Auto-Grading**: Instant quiz results with detailed feedback
- **Progress Dashboard**: Visual progress indicators and analytics
- **Leaderboard**: Compare scores with other students
- **Gamification**: Badges, levels, and streak tracking
- **Certificates**: Earn certificates upon course completion
- **Responsive Design**: Works seamlessly on desktop and mobile

### Admin Features
- **Course Management**: Create, edit, and delete courses
- **Module Management**: Organize courses into modules
- **Material Management**: Upload or embed notes, videos, PDFs, and images
- **Quiz Management**: Create and manage quizzes with multiple question types
- **Analytics**: Track student progress and course performance
- **Student Management**: View student enrollments and progress
- **Reports**: Export course and student data

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **CSS3** - Styling with responsive design

## Project Structure

```
windsurf-project/
├── server.js                 # Main server file
├── package.json             # Backend dependencies
├── .env.example             # Environment variables template
├── models/                  # MongoDB schemas
│   ├── User.js
│   ├── Course.js
│   ├── Module.js
│   ├── Material.js
│   ├── Quiz.js
│   ├── QuizScore.js
│   ├── Progress.js
│   └── Feedback.js
├── routes/                  # API routes
│   ├── auth.js
│   ├── courses.js
│   ├── modules.js
│   ├── materials.js
│   ├── quizzes.js
│   ├── progress.js
│   ├── users.js
│   └── admin.js
├── middleware/              # Custom middleware
│   └── auth.js
└── client/                  # React frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── LoginPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── CoursesPage.js
    │   │   ├── CourseDetailPage.js
    │   │   ├── StudentDashboard.js
    │   │   ├── ProgressDashboard.js
    │   │   ├── NotesViewer.js
    │   │   ├── VideoPlayer.js
    │   │   ├── QuizPage.js
    │   │   └── AdminDashboard.js
    ├── App.js
    └── index.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   cd windsurf-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the backend server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/student/enrolled` - Get enrolled courses

### Modules
- `GET /api/modules/course/:courseId` - Get course modules
- `GET /api/modules/:id` - Get module details

### Materials
- `GET /api/materials/module/:moduleId` - Get module materials
- `GET /api/materials/:id` - Get material details
- `POST /api/materials/:id/complete` - Mark material as completed

### Quizzes
- `GET /api/quizzes/module/:moduleId` - Get module quizzes
- `GET /api/quizzes/:id` - Get quiz details
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `GET /api/quizzes/student/:studentId/scores` - Get student quiz scores

### Progress
- `GET /api/progress/course/:courseId` - Get course progress
- `GET /api/progress/student/all` - Get all student progress
- `GET /api/progress/leaderboard/:courseId` - Get course leaderboard

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/feedback` - Submit module feedback
- `GET /api/users/feedback/:moduleId` - Get module feedback

### Admin
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course
- `POST /api/admin/modules` - Create module
- `PUT /api/admin/modules/:id` - Update module
- `DELETE /api/admin/modules/:id` - Delete module
- `POST /api/admin/materials` - Create material
- `PUT /api/admin/materials/:id` - Update material
- `DELETE /api/admin/materials/:id` - Delete material
- `POST /api/admin/quizzes` - Create quiz
- `PUT /api/admin/quizzes/:id` - Update quiz
- `DELETE /api/admin/quizzes/:id` - Delete quiz
- `GET /api/admin/analytics/course/:courseId` - Get course analytics
- `GET /api/admin/courses/all` - Get all courses (admin view)

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  profileImage: String,
  bio: String,
  enrolledCourses: Array,
  badges: Array,
  level: Number,
  points: Number,
  streak: Number,
  createdAt: Date
}
```

### Course
```javascript
{
  title: String,
  description: String,
  category: String,
  thumbnail: String,
  instructor: ObjectId (ref: User),
  level: String (beginner/intermediate/advanced),
  duration: Number,
  modules: Array (ref: Module),
  enrolledStudents: Array (ref: User),
  totalEnrollments: Number,
  rating: Number,
  isPublished: Boolean,
  createdAt: Date
}
```

### Progress
```javascript
{
  studentId: ObjectId (ref: User),
  courseId: ObjectId (ref: Course),
  moduleProgress: Array,
  coursePercentage: Number,
  totalMaterialsCompleted: Number,
  totalQuizzesAttempted: Number,
  averageQuizScore: Number,
  certificateEarned: Boolean,
  enrolledAt: Date,
  completedAt: Date
}
```

## Key Features Implementation

### Progress Tracking
- Progress is automatically calculated when students:
  - Mark materials as completed
  - Submit quizzes
- Module progress = (completed materials + completed quizzes) / total items
- Course progress = average of all module progress

### Auto-Grading
- Quiz answers are compared with correct answers
- Points are calculated based on question weights
- Percentage and pass/fail status are determined instantly
- Results are stored with timestamps and attempt numbers

### Gamification
- Badges awarded for achievements
- Levels increase with points earned
- Streak tracking for consecutive learning days
- Certificates issued upon 100% course completion

### Responsive Design
- Mobile-first approach
- Flexbox and CSS Grid layouts
- Touch-friendly buttons and inputs
- Optimized for all screen sizes

## Security

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Authorization**: Role-based access control (student/admin)
- **Input Validation**: express-validator for all inputs
- **CORS**: Configured for frontend domain

## Future Enhancements

- Video upload and streaming
- Real-time notifications
- Discussion forums
- Live classes integration
- Payment gateway for premium courses
- Mobile app (React Native)
- Advanced analytics dashboard
- AI-powered recommendations
- Social features (following, messaging)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.

## Authors

EduLearn Development Team

---

**Happy Learning! 📚**
