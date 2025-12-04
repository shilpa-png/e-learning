const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Material = require('./models/Material');
const User = require('./models/User');

dotenv.config();

const seedCoursesWithVideos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elearning');
    console.log('Connected to MongoDB');

    // Get admin user
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.error('Admin user not found. Please run seed.js first.');
      process.exit(1);
    }

    // Courses with beginner-friendly YouTube videos
    const coursesData = [
      {
        title: 'Introduction to JavaScript',
        description: 'Learn JavaScript fundamentals from scratch. Perfect for beginners who want to start web development.',
        category: 'Programming',
        level: 'beginner',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
        instructor: admin._id,
        modules: [
          {
            title: 'JavaScript Basics',
            description: 'Get started with JavaScript fundamentals',
            materials: [
              {
                title: 'What is JavaScript?',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/W6NZfCO5tTE',
                duration: 8
              },
              {
                title: 'Variables and Data Types',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/le-URjBhevE',
                duration: 12
              },
              {
                title: 'Functions in JavaScript',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/FOD408a0EzU',
                duration: 15
              },
              {
                title: 'Arrays and Objects',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/lLSN6weAqKU',
                duration: 18
              },
              {
                title: 'DOM Manipulation',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/y17RuWkWdn8',
                duration: 20
              }
            ]
          }
        ]
      },
      {
        title: 'HTML & CSS Fundamentals',
        description: 'Master the basics of HTML and CSS to create beautiful web pages. Ideal for complete beginners.',
        category: 'Web Development',
        level: 'beginner',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
        instructor: admin._id,
        modules: [
          {
            title: 'HTML Basics',
            description: 'Learn HTML structure and elements',
            materials: [
              {
                title: 'Introduction to HTML',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
                duration: 10
              },
              {
                title: 'HTML Tags and Elements',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/bWPMSSsVo5s',
                duration: 14
              },
              {
                title: 'HTML Forms',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/YwbIeMlxZAU',
                duration: 16
              },
              {
                title: 'Semantic HTML',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/kGW8Al_cga4',
                duration: 12
              },
              {
                title: 'HTML Best Practices',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/UB3IHstot6Q',
                duration: 11
              }
            ]
          },
          {
            title: 'CSS Styling',
            description: 'Learn CSS to style your web pages',
            materials: [
              {
                title: 'CSS Basics',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/OXGznpKZ_sA',
                duration: 13
              },
              {
                title: 'CSS Selectors',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/l1mER1bV0N0',
                duration: 15
              },
              {
                title: 'Flexbox Layout',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/JJSoEo8JSnc',
                duration: 18
              },
              {
                title: 'CSS Grid',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/EiNiSFaiYvU',
                duration: 20
              },
              {
                title: 'Responsive Design',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/srvUrASNj0s',
                duration: 17
              }
            ]
          }
        ]
      },
      {
        title: 'React for Beginners',
        description: 'Start your journey with React. Learn components, hooks, and state management from the ground up.',
        category: 'Frontend',
        level: 'beginner',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
        instructor: admin._id,
        modules: [
          {
            title: 'React Fundamentals',
            description: 'Learn React basics and concepts',
            materials: [
              {
                title: 'What is React?',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                duration: 9
              },
              {
                title: 'JSX and Components',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/sBws8MSXN7A',
                duration: 16
              },
              {
                title: 'Props and State',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/IYvD9oBCuJI',
                duration: 19
              },
              {
                title: 'React Hooks',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q',
                duration: 21
              },
              {
                title: 'Handling Events',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/DZfojMVYIsI',
                duration: 14
              }
            ]
          }
        ]
      },
      {
        title: 'Python Programming Basics',
        description: 'Learn Python programming from scratch. Perfect for beginners interested in backend development.',
        category: 'Programming',
        level: 'beginner',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8b08f?w=500&h=300&fit=crop',
        instructor: admin._id,
        modules: [
          {
            title: 'Python Essentials',
            description: 'Learn Python fundamentals',
            materials: [
              {
                title: 'Introduction to Python',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/rfscVS0vtik',
                duration: 11
              },
              {
                title: 'Variables and Data Types',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/OYOj8l0DIkE',
                duration: 13
              },
              {
                title: 'Control Flow',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/z1Zw_-wDYAg',
                duration: 17
              },
              {
                title: 'Functions',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/u-OmVr_fT98',
                duration: 15
              },
              {
                title: 'Lists and Dictionaries',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/R-HLU9Fl5ug',
                duration: 18
              }
            ]
          }
        ]
      },
      {
        title: 'Web Design Essentials',
        description: 'Learn the principles of web design and create beautiful, user-friendly websites.',
        category: 'Design',
        level: 'beginner',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
        instructor: admin._id,
        modules: [
          {
            title: 'Design Principles',
            description: 'Learn fundamental design principles',
            materials: [
              {
                title: 'Color Theory',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/GyVMoejbGFg',
                duration: 12
              },
              {
                title: 'Typography',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/wOWk3jCWirQ',
                duration: 14
              },
              {
                title: 'Layout and Composition',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/a5KYlHNKQB8',
                duration: 16
              },
              {
                title: 'User Experience (UX)',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/Ovj4hFxko7c',
                duration: 18
              },
              {
                title: 'Responsive Web Design',
                type: 'video',
                videoEmbedUrl: 'https://www.youtube.com/embed/srvUrASNj0s',
                duration: 17
              }
            ]
          }
        ]
      }
    ];

    // Create courses with modules and materials
    for (const courseData of coursesData) {
      const { modules, ...courseInfo } = courseData;

      // Create course
      const course = new Course({
        ...courseInfo,
        isPublished: true
      });
      await course.save();
      console.log(`✅ Course created: ${course.title}`);

      // Create modules and materials
      const moduleIds = [];
      for (let i = 0; i < modules.length; i++) {
        const moduleData = modules[i];
        const { materials, ...moduleInfo } = moduleData;

        const module = new Module({
          ...moduleInfo,
          courseId: course._id,
          order: i + 1,
          isPublished: true
        });
        await module.save();
        console.log(`  📑 Module created: ${module.title}`);

        // Create materials
        const materialIds = [];
        for (let j = 0; j < materials.length; j++) {
          const material = new Material({
            ...materials[j],
            moduleId: module._id,
            order: j + 1,
            isPublished: true
          });
          await material.save();
          materialIds.push(material._id);
          console.log(`    🎥 Video added: ${material.title}`);
        }

        // Update module with material IDs
        module.materials = materialIds;
        await module.save();

        moduleIds.push(module._id);
      }

      // Update course with module IDs
      course.modules = moduleIds;
      await course.save();
    }

    console.log('\n✅ All courses and videos added successfully!');
    console.log('\n📊 Summary:');
    console.log('- 5 new courses created');
    console.log('- 6 modules created');
    console.log('- 25+ beginner-friendly YouTube videos added');
    console.log('\n🎓 Courses added:');
    console.log('1. Introduction to JavaScript');
    console.log('2. HTML & CSS Fundamentals');
    console.log('3. React for Beginners');
    console.log('4. Python Programming Basics');
    console.log('5. Web Design Essentials');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
};

seedCoursesWithVideos();
