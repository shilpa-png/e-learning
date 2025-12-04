# EduLearn - Complete Setup Guide

This guide will help you set up and run the EduLearn e-learning platform on your local machine.

## Prerequisites

Before you start, ensure you have the following installed:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Either:
   - Local installation: [Download](https://www.mongodb.com/try/download/community)
   - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **Git** - [Download](https://git-scm.com/)
4. **npm** or **yarn** - Comes with Node.js

## Step-by-Step Setup

### 1. Clone or Download the Project

```bash
cd windsurf-project
```

### 2. Backend Setup

#### 2.1 Install Backend Dependencies

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- express-validator
- And more...

#### 2.2 Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/elearning
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this

# Server Port
PORT=5000

# Environment
NODE_ENV=development

# Optional: Cloudinary for file uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### 2.3 Set Up MongoDB

**Option A: Local MongoDB**

1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows**: `mongod`
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

#### 2.4 Seed Sample Data (Optional)

To populate the database with sample courses and users:

```bash
node seed.js
```

This creates:
- Admin user: `admin@elearning.com` / `admin123`
- Sample students
- Sample course with modules, materials, and quizzes

#### 2.5 Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected
```

### 3. Frontend Setup

#### 3.1 Navigate to Client Directory

```bash
cd client
```

#### 3.2 Install Frontend Dependencies

```bash
npm install
```

This will install:
- react
- react-router-dom
- axios
- recharts
- lucide-react
- And more...

#### 3.3 Configure Environment Variables (Optional)

Create `.env` file in `client/` directory:

```bash
cp .env.example .env
```

Default configuration:
```env
REACT_APP_API_URL=http://localhost:5000
```

#### 3.4 Start Frontend Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## Accessing the Application

### Home Page
- **URL**: http://localhost:3000
- Browse courses and features

### Student Features
1. **Register**: Create a new account
2. **Login**: Sign in with credentials
3. **Explore Courses**: Browse available courses
4. **Enroll**: Click "Enroll Now" on any course
5. **Learn**: Access materials, watch videos, read notes
6. **Take Quizzes**: Test your knowledge
7. **Track Progress**: View progress dashboard

### Admin Features
1. **Login**: Use admin credentials
   - Email: `admin@elearning.com`
   - Password: `admin123`
2. **Admin Panel**: Navigate to `/admin`
3. **Manage Courses**: Create, edit, delete courses
4. **Manage Modules**: Organize course content
5. **Manage Materials**: Add notes, videos, PDFs
6. **Manage Quizzes**: Create and edit quizzes
7. **View Analytics**: Track student progress

## Test Accounts

### Admin Account
```
Email: admin@elearning.com
Password: admin123
```

### Student Accounts
```
Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123
```

## Project Structure Overview

```
windsurf-project/
├── server.js                 # Main server entry point
├── package.json             # Backend dependencies
├── .env.example             # Environment template
├── seed.js                  # Database seeding script
├── models/                  # MongoDB schemas
│   ├── User.js
│   ├── Course.js
│   ├── Module.js
│   ├── Material.js
│   ├── Quiz.js
│   ├── QuizScore.js
│   ├── Progress.js
│   └── Feedback.js
├── routes/                  # API endpoints
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
    │   ├── pages/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Key Features Walkthrough

### 1. User Authentication
- Register with email and password
- Login with JWT token
- Passwords are hashed with bcryptjs
- Token stored in localStorage

### 2. Course Management
- Browse all published courses
- Filter by category and level
- View course details and modules
- Enroll in courses

### 3. Learning Materials
- Read text notes with rich formatting
- Watch embedded videos (YouTube, Vimeo)
- Upload and stream video files
- View PDFs and images
- Mark materials as completed

### 4. Quizzes & Assessments
- Multiple choice questions (MCQ)
- True/False questions
- Fill-in-the-blank questions
- Auto-grading with instant results
- Detailed answer review
- Retake quizzes (if allowed)
- Time limits (optional)

### 5. Progress Tracking
- Automatic progress calculation
- Module-level progress
- Course-level progress
- Visual progress bars
- Progress history
- Certificate upon completion

### 6. Gamification
- Badges for achievements
- Level system
- Streak tracking
- Leaderboard
- Points system

### 7. Admin Dashboard
- Course CRUD operations
- Module management
- Material management
- Quiz creation and editing
- Student analytics
- Performance reports

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, verify connection string and IP whitelist

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
- Change PORT in `.env`
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**:
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in client `.env`
- Verify CORS is enabled in server.js

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**:
- Run `npm install` in the project root
- Delete `node_modules` and `package-lock.json`, then reinstall

### React App Won't Start
```
Error: ENOENT: no such file or directory
```
**Solution**:
- Navigate to `client` directory
- Run `npm install`
- Ensure Node.js version is compatible

## Development Tips

### Useful Commands

**Backend**
```bash
npm start          # Production mode
npm run dev        # Development with nodemon
node seed.js       # Seed database
```

**Frontend**
```bash
npm start          # Start dev server
npm run build      # Create production build
npm test           # Run tests
```

### API Testing

Use tools like:
- **Postman**: https://www.postman.com/
- **Insomnia**: https://insomnia.rest/
- **Thunder Client**: VS Code extension

Example request:
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@elearning.com",
  "password": "admin123"
}
```

### Database Management

**MongoDB Compass** (GUI):
- Download: https://www.mongodb.com/products/compass
- Connect to local or Atlas database
- Browse collections and documents

**MongoDB Shell**:
```bash
mongosh
use elearning
db.users.find()
db.courses.find()
```

## Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image optimization
- Minification in production build
- Caching strategies

### Backend
- Database indexing
- Query optimization
- Connection pooling
- Rate limiting

## Security Best Practices

1. **Environment Variables**: Never commit `.env` file
2. **JWT Secret**: Use strong, random secret
3. **Password Hashing**: Always hash passwords
4. **Input Validation**: Validate all inputs
5. **CORS**: Configure appropriately
6. **HTTPS**: Use in production
7. **Rate Limiting**: Implement on API endpoints

## Deployment

### Heroku Deployment

**Backend**:
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

**Frontend** (Netlify):
```bash
npm run build
# Deploy build folder to Netlify
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t elearning .
docker run -p 5000:5000 elearning
```

## Next Steps

1. **Customize**: Modify colors, fonts, and branding
2. **Add Content**: Create courses and materials
3. **Integrate Payments**: Add payment gateway
4. **Deploy**: Push to production
5. **Monitor**: Set up logging and monitoring
6. **Scale**: Optimize for more users

## Support & Resources

- **Documentation**: See README.md
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **API Reference**: See routes/ directory

## License

MIT License - See LICENSE file

---

**Happy Learning! 📚**

For issues or questions, please create an issue in the repository.
