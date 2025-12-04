const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Material = require('./models/Material');
const Quiz = require('./models/Quiz');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elearning');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Module.deleteMany({});
    await Material.deleteMany({});
    await Quiz.deleteMany({});

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@elearning.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created');

    // Create sample students
    const student1 = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'student'
    });
    await student1.save();

    const student2 = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'student'
    });
    await student2.save();
    console.log('Sample students created');

    // Create sample course
    const course = new Course({
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive course covers everything you need to know to start building modern web applications.',
      category: 'Web Development',
      level: 'beginner',
      duration: 40,
      instructor: admin._id,
      isPublished: true
    });
    await course.save();
    console.log('Sample course created');

    // Create modules
    const module1 = new Module({
      title: 'HTML Basics',
      description: 'Learn the fundamentals of HTML',
      courseId: course._id,
      order: 1,
      isPublished: true
    });
    await module1.save();

    const module2 = new Module({
      title: 'CSS Styling',
      description: 'Master CSS for styling web pages',
      courseId: course._id,
      order: 2,
      isPublished: true
    });
    await module2.save();

    const module3 = new Module({
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript programming basics',
      courseId: course._id,
      order: 3,
      isPublished: true
    });
    await module3.save();
    console.log('Modules created');

    // Create materials for module 1
    const material1 = new Material({
      title: 'HTML Introduction',
      type: 'note',
      moduleId: module1._id,
      content: '<h2>What is HTML?</h2><p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of websites.</p><h3>Key Concepts:</h3><ul><li>Tags and Elements</li><li>Attributes</li><li>Document Structure</li><li>Semantic HTML</li></ul>',
      order: 1,
      isPublished: true
    });
    await material1.save();

    const material2 = new Material({
      title: 'HTML Video Tutorial',
      type: 'video',
      moduleId: module1._id,
      videoEmbedUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      duration: 15,
      order: 2,
      isPublished: true
    });
    await material2.save();

    // Create quiz for module 1
    const quiz1 = new Quiz({
      title: 'HTML Basics Quiz',
      description: 'Test your knowledge of HTML basics',
      moduleId: module1._id,
      courseId: course._id,
      questions: [
        {
          type: 'mcq',
          question: 'What does HTML stand for?',
          options: [
            { text: 'HyperText Markup Language', isCorrect: true },
            { text: 'High Tech Modern Language', isCorrect: false },
            { text: 'Home Tool Markup Language', isCorrect: false },
            { text: 'Hyperlinks and Text Markup Language', isCorrect: false }
          ],
          correctAnswer: 'HyperText Markup Language',
          points: 1,
          explanation: 'HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.'
        },
        {
          type: 'truefalse',
          question: 'HTML is a programming language.',
          options: [
            { text: 'True', isCorrect: false },
            { text: 'False', isCorrect: true }
          ],
          correctAnswer: 'False',
          points: 1,
          explanation: 'HTML is a markup language, not a programming language. It is used to structure content on web pages.'
        },
        {
          type: 'fillblank',
          question: 'The HTML tag used to create a paragraph is ____.',
          correctAnswer: '<p>',
          points: 1,
          explanation: 'The <p> tag is used to define a paragraph in HTML.'
        }
      ],
      totalPoints: 3,
      passingScore: 60,
      isPublished: true
    });
    await quiz1.save();

    // Update module with materials and quizzes
    module1.materials = [material1._id, material2._id];
    module1.quizzes = [quiz1._id];
    await module1.save();

    // Update course with modules
    course.modules = [module1._id, module2._id, module3._id];
    await course.save();

    console.log('Materials and quizzes created');
    console.log('\n✅ Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin: admin@elearning.com / admin123');
    console.log('Student 1: john@example.com / password123');
    console.log('Student 2: jane@example.com / password123');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
