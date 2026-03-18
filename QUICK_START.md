# Quick Start Guide - Implementing the Platform
**Get from 0% to Production in 12 Weeks**

---

## Week 1: Database Setup (Issue #1)

### Day 1-2: PostgreSQL Setup
```bash
# Option 1: Local PostgreSQL
# Install PostgreSQL on your machine
brew install postgresql@16  # macOS
sudo apt install postgresql # Linux

# Option 2: Cloud PostgreSQL (Recommended)
# Sign up for Render.com, Supabase.com, or Railway.app
# Create a PostgreSQL database
# Copy connection string

# Option 3: Docker
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:16
```

### Day 2-3: Prisma Integration
```bash
# Install Prisma
npm install @prisma/client
npm install -D prisma

# Initialize Prisma
npx prisma init

# This creates:
# - prisma/schema.prisma
# - .env (with DATABASE_URL)
```

**Edit `.env`**:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/premium_course_platform"
```

**Create `prisma/schema.prisma`**:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      String   @default("user") // "user" or "admin"
  plan      String   @default("free") // "free", "basic", "pro", "enterprise"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  enrollments  Enrollment[]
  subscriptions Subscription[]
}

model Course {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String   @db.Text
  instructor  String
  category    String
  level       String   // "beginner", "intermediate", "advanced"
  price       Float    @default(0)
  thumbnail   String?
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  lessons     Lesson[]
  enrollments Enrollment[]
}

model Lesson {
  id            String   @id @default(cuid())
  courseId      String
  course        Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  title         String
  description   String   @db.Text
  videoUrl      String?
  muxAssetId    String?
  muxPlaybackId String?
  duration      Int?     // in seconds
  order         Int
  isFree        Boolean  @default(false)
  createdAt     DateTime @default(now())

  progress LessonProgress[]

  @@index([courseId])
}

model Enrollment {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  courseId    String
  course      Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  progress    Float     @default(0) // 0-100
  enrolledAt  DateTime  @default(now())
  completedAt DateTime?

  @@unique([userId, courseId])
  @@index([userId])
  @@index([courseId])
}

model LessonProgress {
  id          String    @id @default(cuid())
  userId      String
  lessonId    String
  lesson      Lesson    @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  completed   Boolean   @default(false)
  watchTime   Int       @default(0) // in seconds
  lastPosition Int      @default(0) // in seconds
  completedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([userId, lessonId])
  @@index([userId])
  @@index([lessonId])
}

model Subscription {
  id                   String   @id @default(cuid())
  userId               String
  user                 User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  plan                 String   // "basic", "pro", "enterprise"
  status               String   // "active", "canceled", "past_due"
  stripeCustomerId     String
  stripeSubscriptionId String   @unique
  stripePriceId        String
  currentPeriodStart   DateTime
  currentPeriodEnd     DateTime
  cancelAtPeriodEnd    Boolean  @default(false)
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  @@index([userId])
}

model Payment {
  id              String   @id @default(cuid())
  userId          String
  amount          Float
  currency        String   @default("usd")
  status          String   // "succeeded", "pending", "failed"
  stripePaymentId String   @unique
  createdAt       DateTime @default(now())

  @@index([userId])
}
```

### Day 3-4: Migrations and Seed Data
```bash
# Create migration
npx prisma migrate dev --name init

# Create seed file
touch prisma/seed.ts
```

**Edit `prisma/seed.ts`**:
```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  // Create test user
  const userPassword = await bcrypt.hash('user123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      name: 'Test User',
      role: 'user',
    },
  })

  // Create courses (copy from src/lib/data.ts)
  const course1 = await prisma.course.create({
    data: {
      title: 'Next.js 14 Complete Course',
      slug: 'nextjs-14-complete',
      description: 'Master Next.js 14...',
      instructor: 'Sarah Johnson',
      category: 'Web Development',
      level: 'intermediate',
      price: 49.99,
      featured: true,
    },
  })

  // Create lessons
  await prisma.lesson.createMany({
    data: [
      {
        courseId: course1.id,
        title: 'Introduction to Next.js',
        description: 'Learn the basics...',
        order: 1,
        isFree: true,
        duration: 600,
      },
      // ... more lessons
    ],
  })

  console.log('Seed data created!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

**Add to `package.json`**:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

```bash
# Install dependencies
npm install -D ts-node
npm install bcryptjs
npm install -D @types/bcryptjs

# Run seed
npx prisma db seed

# View data in Prisma Studio
npx prisma studio
```

---

## Week 2: Authentication (Issues #2-3)

### Day 1-3: NextAuth.js Setup
```bash
# Install NextAuth v5
npm install next-auth@beta
npm install bcryptjs
npm install -D @types/bcryptjs
```

**Create `src/auth.ts`**:
```typescript
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user) {
          return null
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/member/login',
  }
})
```

**Create `src/app/api/auth/[...nextauth]/route.ts`**:
```typescript
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

**Create `src/app/api/auth/signup/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const prisma = new PrismaClient()

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = signupSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
```

### Day 4-5: Middleware and Route Protection

**Create `src/middleware.ts`**:
```typescript
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user?.role === 'admin'

  // Protect /member/* routes
  if (pathname.startsWith('/member') && pathname !== '/member/login') {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/member/login', req.url))
    }
  }

  // Protect /admin/* routes
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/member/login', req.url))
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/member/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/member/:path*', '/admin/:path*']
}
```

**Update `src/app/member/login/page.tsx`**:
```typescript
'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/member/dashboard')
    }
  }

  return (
    // ... existing UI with updated handleSubmit
  )
}
```

### Test Authentication
```bash
# Start dev server
npm run dev

# Test:
# 1. Go to http://localhost:3000/member/login
# 2. Login with: admin@example.com / admin123
# 3. Should redirect to /member/dashboard
# 4. Try accessing /admin/dashboard - should work
# 5. Logout and try accessing /admin - should redirect to login
```

---

## Week 3-4: API Endpoints (Issues #4-6)

```bash
# Install validation library
npm install zod
```

**Create `src/lib/validations/course.ts`**:
```typescript
import { z } from 'zod'

export const courseSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  instructor: z.string(),
  category: z.string(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  price: z.number().min(0),
  thumbnail: z.string().url().optional(),
})
```

**Create `src/app/api/courses/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const category = searchParams.get('category')
  const level = searchParams.get('level')
  const search = searchParams.get('search')

  const where = {
    ...(category && { category }),
    ...(level && { level }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    })
  }

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: { enrollments: true, lessons: true }
        }
      }
    }),
    prisma.course.count({ where })
  ])

  return NextResponse.json({
    courses,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  })
}
```

Continue with similar patterns for:
- `src/app/api/enrollments/route.ts`
- `src/app/api/progress/lessons/[id]/route.ts`
- `src/app/api/admin/courses/route.ts`

---

## Week 5-6: Stripe Integration (Issues #7-9)

```bash
npm install stripe @stripe/stripe-js
```

See IMPLEMENTATION_ISSUES.md for detailed Stripe setup.

---

## Week 7-8: Video Streaming (Issues #10-12)

```bash
npm install @mux/mux-node @mux/mux-player-react
```

See IMPLEMENTATION_ISSUES.md for detailed Mux setup.

---

## Environment Variables Checklist

**Create `.env.local`**:
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate with: openssl rand -base64 32>"

# Stripe (get from stripe.com/dashboard)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Mux (get from mux.com)
MUX_TOKEN_ID="..."
MUX_TOKEN_SECRET="..."
MUX_WEBHOOK_SECRET="..."

# SendGrid (get from sendgrid.com)
SENDGRID_API_KEY="SG..."
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
SENDGRID_FROM_NAME="Premium Course Platform"

# Redis (get from upstash.com)
REDIS_URL="redis://..."

# Sentry (get from sentry.io)
SENTRY_DSN="https://..."
```

---

## Testing Checklist

After each phase, test:

### Phase 1 (Database + Auth)
- [ ] Database connection works
- [ ] Users can register
- [ ] Users can login
- [ ] Sessions persist
- [ ] Admin routes are protected
- [ ] Regular users can't access admin

### Phase 2 (Payments)
- [ ] Stripe checkout works
- [ ] Subscription is created
- [ ] Webhooks update database
- [ ] Access control works

### Phase 3 (Videos)
- [ ] Videos upload to Mux
- [ ] Videos stream correctly
- [ ] Progress tracking works
- [ ] Resume from position works

---

**Good luck! 🚀**

Refer to:
- IMPLEMENTATION_ISSUES.md for detailed issue descriptions
- ROADMAP.md for timeline
- AUDIT_REPORT.md for full analysis
