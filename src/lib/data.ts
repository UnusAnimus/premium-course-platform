export const courses = [
  {
    id: '1', slug: 'react-mastery', title: 'React 19 Mastery', description: 'Deep dive into React 19, Server Components, and the App Router. Build production-ready applications from scratch.', lessonsCount: 42, price: 129, instructor: 'Sarah Chen', thumbnail: 'https://placehold.co/640x360/3b82f6/ffffff?text=React+19', duration: '28h 30m', level: 'Advanced', tags: ['React', 'TypeScript', 'Next.js'], rating: 4.9, studentsCount: 12840, featured: true,
  },
  {
    id: '2', slug: 'nextjs-fullstack', title: 'Next.js Full-Stack Development', description: 'Build scalable full-stack apps with Next.js 14, Server Actions, Prisma, and PostgreSQL.', lessonsCount: 38, price: 149, instructor: 'Marcus Rivera', thumbnail: 'https://placehold.co/640x360/8b5cf6/ffffff?text=Next.js', duration: '32h 15m', level: 'Intermediate', tags: ['Next.js', 'Prisma', 'PostgreSQL'], rating: 4.8, studentsCount: 9320, featured: true,
  },
  {
    id: '3', slug: 'typescript-pro', title: 'TypeScript Pro Patterns', description: 'Master TypeScript generics, decorators, advanced types, and enterprise-grade architecture patterns.', lessonsCount: 28, price: 99, instructor: 'Aisha Johnson', thumbnail: 'https://placehold.co/640x360/06b6d4/ffffff?text=TypeScript', duration: '18h 45m', level: 'Advanced', tags: ['TypeScript', 'Design Patterns'], rating: 4.7, studentsCount: 7650, featured: false,
  },
  {
    id: '4', slug: 'system-design', title: 'System Design Fundamentals', description: 'Learn to design scalable distributed systems, from load balancers to microservices and beyond.', lessonsCount: 32, price: 179, instructor: 'David Park', thumbnail: 'https://placehold.co/640x360/10b981/ffffff?text=System+Design', duration: '24h 00m', level: 'Advanced', tags: ['Architecture', 'Distributed Systems'], rating: 4.9, studentsCount: 5420, featured: true,
  },
  {
    id: '5', slug: 'node-backend', title: 'Node.js Backend Engineering', description: 'Build high-performance REST and GraphQL APIs with Node.js, Express, and modern tooling.', lessonsCount: 35, price: 119, instructor: 'Emma Wilson', thumbnail: 'https://placehold.co/640x360/f59e0b/ffffff?text=Node.js', duration: '22h 30m', level: 'Intermediate', tags: ['Node.js', 'GraphQL', 'REST'], rating: 4.6, studentsCount: 8900, featured: false,
  },
  {
    id: '6', slug: 'devops-kubernetes', title: 'DevOps & Kubernetes in Practice', description: 'Container orchestration, CI/CD pipelines, and cloud-native deployments with Kubernetes.', lessonsCount: 40, price: 199, instructor: 'James Lee', thumbnail: 'https://placehold.co/640x360/ef4444/ffffff?text=DevOps', duration: '30h 00m', level: 'Advanced', tags: ['Kubernetes', 'Docker', 'CI/CD'], rating: 4.8, studentsCount: 4210, featured: false,
  },
  {
    id: '7', slug: 'python-ml', title: 'Python for Machine Learning', description: 'From pandas and numpy to neural networks with PyTorch. A practical ML engineering course.', lessonsCount: 45, price: 159, instructor: 'Priya Sharma', thumbnail: 'https://placehold.co/640x360/8b5cf6/ffffff?text=Python+ML', duration: '36h 00m', level: 'Intermediate', tags: ['Python', 'ML', 'PyTorch'], rating: 4.7, studentsCount: 11200, featured: false,
  },
  {
    id: '8', slug: 'web3-solidity', title: 'Web3 & Solidity Fundamentals', description: 'Build decentralized applications on Ethereum with Solidity, Hardhat, and ethers.js.', lessonsCount: 25, price: 139, instructor: 'Alex Thompson', thumbnail: 'https://placehold.co/640x360/3b82f6/ffffff?text=Web3', duration: '16h 30m', level: 'Beginner', tags: ['Web3', 'Solidity', 'Ethereum'], rating: 4.5, studentsCount: 3890, featured: false,
  },
];

export const lessons = [
  { id: '1', slug: 'intro-to-react', courseId: '1', title: 'Introduction to React 19', description: 'Overview of React 19 and what\'s new.', duration: '12:30', order: 1, videoUrl: 'https://example.com/video1', isFree: true },
  { id: '2', slug: 'jsx-fundamentals', courseId: '1', title: 'JSX Fundamentals', description: 'Understanding JSX syntax and best practices.', duration: '18:45', order: 2, videoUrl: 'https://example.com/video2', isFree: true },
  { id: '3', slug: 'components-props', courseId: '1', title: 'Components & Props', description: 'Building reusable components with props.', duration: '22:10', order: 3, videoUrl: 'https://example.com/video3', isFree: false },
  { id: '4', slug: 'state-hooks', courseId: '1', title: 'State & Hooks Deep Dive', description: 'useState, useEffect, useRef and more.', duration: '35:20', order: 4, videoUrl: 'https://example.com/video4', isFree: false },
  { id: '5', slug: 'server-components', courseId: '1', title: 'React Server Components', description: 'Building with RSC architecture.', duration: '28:15', order: 5, videoUrl: 'https://example.com/video5', isFree: false },
  { id: '6', slug: 'nextjs-intro', courseId: '2', title: 'Next.js App Router Intro', description: 'Getting started with the App Router.', duration: '15:00', order: 1, videoUrl: 'https://example.com/video6', isFree: true },
  { id: '7', slug: 'routing-layouts', courseId: '2', title: 'Routing & Layouts', description: 'Nested layouts and dynamic routes.', duration: '20:30', order: 2, videoUrl: 'https://example.com/video7', isFree: true },
  { id: '8', slug: 'server-actions', courseId: '2', title: 'Server Actions', description: 'Mutations with Server Actions.', duration: '25:45', order: 3, videoUrl: 'https://example.com/video8', isFree: false },
  { id: '9', slug: 'prisma-setup', courseId: '2', title: 'Prisma ORM Setup', description: 'Database modeling with Prisma.', duration: '30:00', order: 4, videoUrl: 'https://example.com/video9', isFree: false },
  { id: '10', slug: 'typescript-basics', courseId: '3', title: 'TypeScript Basics Refresher', description: 'Core types and interfaces.', duration: '16:30', order: 1, videoUrl: 'https://example.com/video10', isFree: true },
  { id: '11', slug: 'generics-advanced', courseId: '3', title: 'Advanced Generics', description: 'Conditional and mapped types.', duration: '32:15', order: 2, videoUrl: 'https://example.com/video11', isFree: false },
  { id: '12', slug: 'design-patterns', courseId: '3', title: 'Design Patterns in TS', description: 'Factory, Observer, and more.', duration: '40:00', order: 3, videoUrl: 'https://example.com/video12', isFree: false },
  { id: '13', slug: 'system-intro', courseId: '4', title: 'System Design Overview', description: 'Key concepts and tradeoffs.', duration: '20:00', order: 1, videoUrl: 'https://example.com/video13', isFree: true },
  { id: '14', slug: 'load-balancing', courseId: '4', title: 'Load Balancing Strategies', description: 'Round-robin, least-conn, IP hash.', duration: '28:30', order: 2, videoUrl: 'https://example.com/video14', isFree: false },
  { id: '15', slug: 'caching-strategies', courseId: '4', title: 'Caching Strategies', description: 'Redis, CDN, and browser caching.', duration: '35:00', order: 3, videoUrl: 'https://example.com/video15', isFree: false },
];

export const users = [
  { id: '1', name: 'Alice Morgan', email: 'alice@example.com', plan: 'Pro', joinedAt: '2024-01-15', progress: 78, coursesEnrolled: 4, lastActive: '2024-07-01' },
  { id: '2', name: 'Bob Chen', email: 'bob@example.com', plan: 'Basic', joinedAt: '2024-02-20', progress: 45, coursesEnrolled: 2, lastActive: '2024-06-28' },
  { id: '3', name: 'Carol Smith', email: 'carol@example.com', plan: 'Enterprise', joinedAt: '2023-11-10', progress: 92, coursesEnrolled: 7, lastActive: '2024-07-02' },
  { id: '4', name: 'Daniel Park', email: 'daniel@example.com', plan: 'Pro', joinedAt: '2024-03-05', progress: 61, coursesEnrolled: 3, lastActive: '2024-06-30' },
  { id: '5', name: 'Eva Martinez', email: 'eva@example.com', plan: 'Basic', joinedAt: '2024-04-12', progress: 33, coursesEnrolled: 1, lastActive: '2024-06-25' },
  { id: '6', name: 'Frank Liu', email: 'frank@example.com', plan: 'Pro', joinedAt: '2024-01-28', progress: 85, coursesEnrolled: 5, lastActive: '2024-07-01' },
  { id: '7', name: 'Grace Kim', email: 'grace@example.com', plan: 'Enterprise', joinedAt: '2023-09-14', progress: 97, coursesEnrolled: 8, lastActive: '2024-07-02' },
  { id: '8', name: 'Henry Johnson', email: 'henry@example.com', plan: 'Basic', joinedAt: '2024-05-01', progress: 22, coursesEnrolled: 1, lastActive: '2024-06-20' },
  { id: '9', name: 'Iris Williams', email: 'iris@example.com', plan: 'Pro', joinedAt: '2024-02-14', progress: 69, coursesEnrolled: 4, lastActive: '2024-06-29' },
  { id: '10', name: 'Jack Brown', email: 'jack@example.com', plan: 'Enterprise', joinedAt: '2023-12-01', progress: 88, coursesEnrolled: 6, lastActive: '2024-07-02' },
];

export const testimonials = [
  { id: '1', name: 'Sarah Mitchell', role: 'Senior Engineer', company: 'Google', content: 'AcademyPro transformed my career. The React course alone got me my dream job at a FAANG company. The depth and quality of content is unmatched.', rating: 5, avatar: 'SM' },
  { id: '2', name: 'Carlos Reyes', role: 'CTO', company: 'StartupXYZ', content: 'We use AcademyPro Enterprise for our entire engineering team. The system design course is essential reading for any backend engineer.', rating: 5, avatar: 'CR' },
  { id: '3', name: 'Yuki Tanaka', role: 'Fullstack Developer', company: 'Shopify', content: 'The Next.js course is incredibly comprehensive. I went from zero to shipping production apps in 3 months. Worth every penny.', rating: 5, avatar: 'YT' },
  { id: '4', name: 'Amara Osei', role: 'ML Engineer', company: 'OpenAI', content: 'Best Python ML course on the internet, period. The practical approach and real-world projects make all the difference.', rating: 4, avatar: 'AO' },
  { id: '5', name: 'Luke Patterson', role: 'DevOps Lead', company: 'Netflix', content: 'The Kubernetes course is production-grade. I implemented what I learned directly into our infrastructure. 10/10 recommend.', rating: 5, avatar: 'LP' },
  { id: '6', name: 'Fatima Al-Hassan', role: 'Frontend Lead', company: 'Stripe', content: 'TypeScript Pro Patterns changed how I write code entirely. The instructor\'s explanations of complex generics are crystal clear.', rating: 5, avatar: 'FA' },
];

export const pricingPlans = [
  {
    id: '1', name: 'Basic', price: 29, period: 'month', description: 'Perfect for individual learners getting started.',
    features: ['Access to 20+ free courses', 'Community forum access', 'Course completion certificates', 'Mobile app access', 'Monthly new content'],
    highlighted: false, cta: 'Get Started',
  },
  {
    id: '2', name: 'Pro', price: 79, period: 'month', description: 'For serious learners who want full access.',
    features: ['Unlimited course access', 'Priority support (24h response)', 'Live Q&A sessions monthly', 'Downloadable resources', 'Early access to new courses', 'Advanced projects & labs', 'LinkedIn skill badge'],
    highlighted: true, cta: 'Start Pro',
  },
  {
    id: '3', name: 'Enterprise', price: 299, period: 'month', description: 'For teams and organizations at scale.',
    features: ['Everything in Pro', 'Up to 50 team seats', 'Custom learning paths', 'Dedicated account manager', 'Team analytics dashboard', 'SSO & SCIM integration', 'Custom invoicing', 'SLA guarantee'],
    highlighted: false, cta: 'Contact Sales',
  },
];

export const stats = {
  totalCourses: 120,
  totalStudents: 48200,
  totalLessons: 3800,
  avgRating: 4.8,
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export const memberNavItems = [
  { label: 'Dashboard', href: '/member/dashboard', icon: 'dashboard' },
  { label: 'My Courses', href: '/member/courses', icon: 'courses' },
  { label: 'Progress', href: '/member/progress', icon: 'progress' },
  { label: 'Settings', href: '/member/settings', icon: 'settings' },
];

export const adminNavItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
  { label: 'Courses', href: '/admin/courses', icon: 'courses' },
  { label: 'Lessons', href: '/admin/lessons', icon: 'lessons' },
  { label: 'Users', href: '/admin/users', icon: 'users' },
  { label: 'Memberships', href: '/admin/memberships', icon: 'memberships' },
  { label: 'Settings', href: '/admin/settings', icon: 'settings' },
];
