import { PrismaClient } from '@prisma/client';
import { loadEnv } from '../src/config/env';

// Load environment variables before anything else
loadEnv();

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Starting database seed...');

  // ── Clear existing data (order matters for any future FK constraints) ──────
  await prisma.contactMessage.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.education.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  console.log('🗑️  Cleared existing data');

  // ── Profile ───────────────────────────────────────────────────────────────
  await prisma.profile.create({
    data: {
      name: 'Vasavi Guptha Vanaparthy',
      headline: 'Computer Science Undergraduate | Backend Developer | Full-Stack Enthusiast',
      summary:
        'I am a Computer Science undergraduate at VIT-AP University with strong foundations in Data Structures & Algorithms, Object-Oriented Programming, Software Engineering, REST APIs, backend development, and database-driven applications. My goal is to become a strong software engineer by building reliable software systems, learning modern technologies, and solving real-world engineering problems.',
      email: 'vasavivanaparthy03@gmail.com',
      phone: '+91-6302851862',
      location: 'Hyderabad, Telangana',
      linkedinUrl: 'https://www.linkedin.com/in/vasavi-vanaparthy',
      githubUrl: 'https://github.com/VASAVIGUPTHA777',
    },
  });
  console.log('✅ Profile seeded');

  // ── Skills ────────────────────────────────────────────────────────────────
  const skillsData = [
    // Languages
    { name: 'Java', category: 'LANGUAGES' as const, proficiency: 'ADVANCED' as const, displayOrder: 1 },
    { name: 'Python', category: 'LANGUAGES' as const, proficiency: 'ADVANCED' as const, displayOrder: 2 },
    { name: 'JavaScript', category: 'LANGUAGES' as const, proficiency: 'ADVANCED' as const, displayOrder: 3 },
    { name: 'TypeScript', category: 'LANGUAGES' as const, proficiency: 'ADVANCED' as const, displayOrder: 4 },
    { name: 'SQL', category: 'LANGUAGES' as const, proficiency: 'ADVANCED' as const, displayOrder: 5 },

    // Frameworks & Web
    { name: 'Angular', category: 'FRAMEWORKS_AND_WEB' as const, proficiency: 'INTERMEDIATE' as const, displayOrder: 1 },
    { name: 'Node.js', category: 'FRAMEWORKS_AND_WEB' as const, proficiency: 'ADVANCED' as const, displayOrder: 2 },
    { name: 'Express.js', category: 'FRAMEWORKS_AND_WEB' as const, proficiency: 'ADVANCED' as const, displayOrder: 3 },
    { name: 'HTML5', category: 'FRAMEWORKS_AND_WEB' as const, proficiency: 'ADVANCED' as const, displayOrder: 4 },
    { name: 'CSS3', category: 'FRAMEWORKS_AND_WEB' as const, proficiency: 'ADVANCED' as const, displayOrder: 5 },

    // Databases
    { name: 'PostgreSQL', category: 'DATABASES' as const, proficiency: 'ADVANCED' as const, displayOrder: 1 },
    { name: 'MySQL', category: 'DATABASES' as const, proficiency: 'INTERMEDIATE' as const, displayOrder: 2 },
    { name: 'MongoDB', category: 'DATABASES' as const, proficiency: 'INTERMEDIATE' as const, displayOrder: 3 },
    { name: 'Redis', category: 'DATABASES' as const, proficiency: 'BEGINNER' as const, displayOrder: 4 },
    { name: 'MonetDB', category: 'DATABASES' as const, proficiency: 'BEGINNER' as const, displayOrder: 5 },

    // Core Computer Science
    { name: 'Data Structures & Algorithms', category: 'CORE_CS' as const, proficiency: 'ADVANCED' as const, displayOrder: 1 },
    { name: 'Object-Oriented Programming', category: 'CORE_CS' as const, proficiency: 'ADVANCED' as const, displayOrder: 2 },
    { name: 'DBMS', category: 'CORE_CS' as const, proficiency: 'ADVANCED' as const, displayOrder: 3 },
    { name: 'Operating Systems', category: 'CORE_CS' as const, proficiency: 'INTERMEDIATE' as const, displayOrder: 4 },
    { name: 'Computer Networks', category: 'CORE_CS' as const, proficiency: 'INTERMEDIATE' as const, displayOrder: 5 },

    // Tools
    { name: 'Git', category: 'TOOLS' as const, proficiency: 'ADVANCED' as const, displayOrder: 1 },
    { name: 'Postman', category: 'TOOLS' as const, proficiency: 'ADVANCED' as const, displayOrder: 2 },
    { name: 'VS Code', category: 'TOOLS' as const, proficiency: 'ADVANCED' as const, displayOrder: 3 },
    { name: 'Google Colab', category: 'TOOLS' as const, proficiency: 'INTERMEDIATE' as const, displayOrder: 4 },

    // Concepts
    { name: 'RESTful APIs', category: 'CONCEPTS' as const, proficiency: 'ADVANCED' as const, displayOrder: 1 },
    { name: 'Object-Oriented Design', category: 'CONCEPTS' as const, proficiency: 'ADVANCED' as const, displayOrder: 2 },
  ];

  await prisma.skill.createMany({ data: skillsData });
  console.log(`✅ ${skillsData.length} skills seeded`);

  // ── Experience ────────────────────────────────────────────────────────────
  await prisma.experience.create({
    data: {
      company: 'ByteSimplified',
      position: 'Software Engineer Intern',
      startDate: new Date('2025-06-01'),
      endDate: null,
      currentlyWorking: true,
      description:
        'Developed client-based web applications and backend integrations using modern web technologies. Collaborated on real-world software development projects by implementing scalable and user-focused features. Integrated REST APIs and optimized backend functionality to improve application performance. Worked with Git-based workflows while collaborating in an Agile development environment.',
      technologies: ['Node.js', 'Express.js', 'REST APIs', 'Git', 'Agile'],
      displayOrder: 1,
    },
  });
  console.log('✅ Experience seeded');

  // ── Projects ──────────────────────────────────────────────────────────────
  await prisma.project.createMany({
    data: [
      {
        title: 'Global Partner Gateway',
        description:
          'Implemented secure supplier authentication using JWT and bcrypt. Designed a normalized PostgreSQL database schema using Prisma ORM. Developed RESTful APIs for supplier authentication and booking retrieval with pagination. Built scalable backend services using Node.js, Express.js, PostgreSQL and Prisma ORM.',
        technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'JWT', 'bcrypt'],
        githubUrl: null,
        liveUrl: null,
        imageUrl: null,
        displayOrder: 1,
      },
      {
        title: 'Intrusion Detection System',
        description:
          'Developed an intrusion detection system using supervised machine learning algorithms. Performed feature engineering and evaluated multiple classification models to improve anomaly detection accuracy. Achieved improved detection performance through data preprocessing and model evaluation techniques.',
        technologies: ['Python', 'Scikit-learn', 'Machine Learning', 'Feature Engineering'],
        githubUrl: null,
        liveUrl: null,
        imageUrl: null,
        displayOrder: 2,
      },
    ],
  });
  console.log('✅ Projects seeded');

  // ── Education ─────────────────────────────────────────────────────────────
  await prisma.education.createMany({
    data: [
      {
        degree: 'Integrated M.Tech in Computer Science and Engineering',
        institution: 'VIT-AP University',
        startYear: 2023,
        endYear: null,
        expectedGraduation: '2028',
        cgpa: 8.45,
        percentage: null,
        gpa: null,
        description: 'Five-year integrated program focusing on Computer Science fundamentals, software engineering, algorithms, and systems design.',
        displayOrder: 1,
      },
      {
        degree: 'Intermediate (MPC)',
        institution: 'Deksha Junior College, Hyderabad',
        startYear: 2021,
        endYear: 2023,
        expectedGraduation: null,
        cgpa: null,
        percentage: 96.8,
        gpa: null,
        description: null,
        displayOrder: 2,
      },
      {
        degree: 'Secondary Education (SSC)',
        institution: 'Siddartha Model High School, Medak',
        startYear: 2020,
        endYear: 2021,
        expectedGraduation: null,
        cgpa: null,
        percentage: null,
        gpa: '10/10',
        description: null,
        displayOrder: 3,
      },
    ],
  });
  console.log('✅ Education seeded');

  // ── Achievements ──────────────────────────────────────────────────────────
  await prisma.achievement.createMany({
    data: [
      {
        title: 'Maintained CGPA of 8.45',
        description:
          'Maintained a CGPA of 8.45 while balancing academics, internship and software engineering projects at VIT-AP University.',
        displayOrder: 1,
      },
      {
        title: 'Selected as Software Engineer Intern at ByteSimplified',
        description:
          'Selected as a Software Engineer Intern at ByteSimplified and contributed to real-world client projects, working on backend integrations and web application development.',
        displayOrder: 2,
      },
      {
        title: 'Built Full-Stack Backend Applications',
        description:
          'Built backend applications using REST APIs, PostgreSQL, Prisma ORM and JWT authentication, demonstrating practical software engineering skills.',
        displayOrder: 3,
      },
    ],
  });
  console.log('✅ Achievements seeded');

  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((error: unknown) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
