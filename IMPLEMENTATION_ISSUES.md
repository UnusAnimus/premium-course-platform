# Implementation Issues for Premium Course Platform

This file contains all GitHub issues that need to be created for completing the premium course platform.

To create these issues, run:
```bash
# Install GitHub CLI if not already installed
# Then for each issue:
gh issue create --title "TITLE" --label "LABELS" --body "BODY"
```

Or import via GitHub's issue template system or manually create them.

---

## CRITICAL PRIORITY - Phase 1: Foundation

### Issue #1: Database Setup and Prisma ORM Integration
**Title**: [Foundation] Set up PostgreSQL database and Prisma ORM
**Labels**: `priority:critical`, `phase:1-foundation`, `backend`
**Assignee**: Backend Developer
**Estimated Effort**: 3-4 days

**Description:**
Set up PostgreSQL database and integrate Prisma ORM for data persistence. Currently, all data is hardcoded in `/src/lib/data.ts` with no persistence.

**Tasks:**
- [ ] Install and configure PostgreSQL (local or Render/Supabase)
- [ ] Add Prisma dependencies: `npm install @prisma/client` and `npm install -D prisma`
- [ ] Initialize Prisma: `npx prisma init`
- [ ] Create Prisma schema (`prisma/schema.prisma`) with tables:
  - [ ] **Users**: id, email, password (hashed), name, role (user/admin), plan (basic/pro/enterprise), createdAt, updatedAt
  - [ ] **Courses**: id, title, slug, description, instructor, category, level, price, thumbnail, featured, createdAt, updatedAt
  - [ ] **Lessons**: id, courseId (FK), title, description, videoUrl, muxAssetId, muxPlaybackId, duration, order, isFree, createdAt
  - [ ] **Enrollments**: id, userId (FK), courseId (FK), progress (0-100), enrolledAt, completedAt
  - [ ] **LessonProgress**: id, userId (FK), lessonId (FK), completed (boolean), watchTime (seconds), lastPosition (seconds), completedAt
  - [ ] **Subscriptions**: id, userId (FK), plan, status, stripeCustomerId, stripeSubscriptionId, currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd
  - [ ] **Payments**: id, userId (FK), amount, currency, status, stripePaymentId, createdAt
  - [ ] **Sessions**: id, userId (FK), token, expiresAt, createdAt
- [ ] Define proper relationships (one-to-many, many-to-many)
- [ ] Create initial migration: `npx prisma migrate dev --name init`
- [ ] Create seed script (`prisma/seed.ts`) with sample data from `/src/lib/data.ts`
- [ ] Run seed: `npx prisma db seed`
- [ ] Configure environment variables in `.env`:
  ```
  DATABASE_URL="postgresql://user:password@localhost:5432/premium_course_platform"
  ```
- [ ] Test database connection and queries

**Acceptance Criteria:**
- ✅ Database is running and accessible
- ✅ All tables are created with proper relationships and constraints
- ✅ Seed data populates successfully with sample courses, users, lessons
- ✅ Prisma Client is generated and can query data
- ✅ No errors when running `npx prisma studio`

**Dependencies:** None

---

### Issue #2: Authentication System with NextAuth.js
**Title**: [Foundation] Implement complete authentication system
**Labels**: `priority:critical`, `phase:1-foundation`, `backend`, `security`
**Assignee**: Backend Developer
**Estimated Effort**: 5-6 days

**Description:**
Implement full authentication system using NextAuth.js v5 for user registration, login, and session management. Currently, the login page shows a loading spinner for 1.5 seconds and does nothing.

**Tasks:**
- [ ] Install NextAuth.js: `npm install next-auth@beta` (v5)
- [ ] Install bcrypt: `npm install bcryptjs && npm install -D @types/bcryptjs`
- [ ] Create NextAuth configuration (`src/auth.ts` or `src/lib/auth.ts`)
- [ ] Configure credentials provider for email/password login
- [ ] Create `/api/auth/[...nextauth]/route.ts` API route
- [ ] Implement user registration endpoint: `POST /api/auth/signup`
  - [ ] Validate email format (use Zod)
  - [ ] Check password strength (min 8 chars, uppercase, lowercase, number)
  - [ ] Hash password with bcrypt (salt rounds: 10)
  - [ ] Check for duplicate email in database
  - [ ] Create user in database with default role 'user'
  - [ ] Return success/error response
- [ ] Configure login logic in NextAuth:
  - [ ] Find user by email
  - [ ] Verify password with bcrypt.compare()
  - [ ] Return user object (exclude password)
- [ ] Implement JWT token generation and validation
- [ ] Configure session strategy (JWT)
- [ ] Add session to request context
- [ ] Implement logout functionality
- [ ] Create password reset flow:
  - [ ] `POST /api/auth/forgot-password` - Generate reset token, send email
  - [ ] Store token in database with 1-hour expiration
  - [ ] `POST /api/auth/reset-password` - Verify token and update password
- [ ] (Optional) Email verification flow
- [ ] Configure environment variables:
  ```
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
  ```

**Acceptance Criteria:**
- ✅ Users can register with email/password
- ✅ Duplicate email registration is prevented with clear error
- ✅ Users can log in with correct credentials
- ✅ Login fails with incorrect password
- ✅ Session persists across page reloads
- ✅ Users can log out successfully
- ✅ Password reset flow works end-to-end
- ✅ Passwords are hashed in database (never plain text)
- ✅ JWT tokens are signed and validated correctly

**Dependencies:**
- Issue #1 (Database Setup) - required for user storage

---

### Issue #3: Authentication Middleware and Route Protection
**Title**: [Foundation] Add authentication middleware and protect routes
**Labels**: `priority:critical`, `phase:1-foundation`, `backend`, `security`
**Assignee**: Backend Developer
**Estimated Effort**: 2-3 days

**Description:**
Create middleware to protect `/admin/*` and `/member/*` routes. Currently, anyone can access these routes without authentication by typing the URL.

**Tasks:**
- [ ] Create authentication middleware (`src/middleware.ts`)
- [ ] Use NextAuth's `auth` helper to check session
- [ ] Protect `/member/*` routes:
  - [ ] Check if user is authenticated
  - [ ] Redirect to `/member/login` if not authenticated
  - [ ] Allow access if authenticated
- [ ] Protect `/admin/*` routes:
  - [ ] Check if user is authenticated
  - [ ] Check if user role is 'admin'
  - [ ] Redirect to `/member/login` if not authenticated
  - [ ] Return 403 Forbidden if authenticated but not admin
  - [ ] Allow access if admin
- [ ] Add role-based access control (RBAC) helper functions
- [ ] Handle expired sessions:
  - [ ] Clear expired session
  - [ ] Redirect to login with return URL
- [ ] Add session validation on each protected request
- [ ] Configure matcher in middleware to apply to specific paths
- [ ] Test middleware doesn't affect public pages

**Acceptance Criteria:**
- ✅ Unauthenticated users cannot access `/member/*` routes
- ✅ Unauthenticated users cannot access `/admin/*` routes
- ✅ Regular users (role: 'user') cannot access `/admin/*` routes
- ✅ Admin users can access both `/admin/*` and `/member/*` routes
- ✅ Redirects preserve return URL for post-login redirect
- ✅ Expired sessions redirect to login
- ✅ Public pages remain accessible
- ✅ No performance degradation (middleware is fast)

**Dependencies:**
- Issue #2 (Authentication System) - required for session checking

---

### Issue #4: User Management API Endpoints
**Title**: [Foundation] Build User Management API endpoints
**Labels**: `priority:critical`, `phase:1-foundation`, `backend`
**Assignee**: Backend Developer
**Estimated Effort**: 3-4 days

**Description:**
Create API endpoints for user profile management and admin user management. Currently, all user data is hardcoded in `/src/lib/data.ts`.

**Tasks:**
- [ ] Install Zod for validation: `npm install zod`
- [ ] Create validation schemas (`src/lib/validations/user.ts`)
- [ ] **User Profile Endpoints:**
  - [ ] `GET /api/users/me` - Get current user profile
    - [ ] Return user data (exclude password)
    - [ ] Include subscription status
  - [ ] `PUT /api/users/me` - Update current user profile
    - [ ] Allow updating: name, email (with verification)
    - [ ] Validate inputs with Zod
    - [ ] Prevent duplicate email
  - [ ] `DELETE /api/users/me` - Delete user account (soft delete)
    - [ ] Mark user as deleted (don't actually delete)
    - [ ] Cancel active subscriptions
    - [ ] Return confirmation
- [ ] **Admin User Management Endpoints:**
  - [ ] `GET /api/admin/users` - List all users (admin only)
    - [ ] Pagination: ?page=1&limit=10
    - [ ] Filter by: role, plan, status
    - [ ] Search by: name, email
    - [ ] Sort by: createdAt, name, email
    - [ ] Return total count for pagination
  - [ ] `GET /api/admin/users/:id` - Get single user details
  - [ ] `PUT /api/admin/users/:id` - Update user (admin only)
    - [ ] Allow updating: name, email, role, plan
  - [ ] `DELETE /api/admin/users/:id` - Ban/delete user (admin only)
    - [ ] Soft delete (set status to 'banned')
    - [ ] Cancel subscriptions
- [ ] Add comprehensive error handling
- [ ] Add rate limiting (use `@upstash/ratelimit` or similar)
- [ ] Validate all inputs with Zod
- [ ] Return proper HTTP status codes

**Acceptance Criteria:**
- ✅ All endpoints return proper status codes (200, 400, 401, 403, 404, 500)
- ✅ Input validation works and returns clear error messages
- ✅ Admin endpoints require admin role
- ✅ Pagination works efficiently with large datasets
- ✅ Search and filters work as expected
- ✅ Rate limiting prevents abuse
- ✅ Passwords are never returned in responses

**Dependencies:**
- Issue #1 (Database Setup)
- Issue #3 (Authentication Middleware)

---

### Issue #5: Course Management API Endpoints
**Title**: [Foundation] Build Course Management API endpoints
**Labels**: `priority:critical`, `phase:1-foundation`, `backend`
**Assignee**: Backend Developer
**Estimated Effort**: 4-5 days

**Description:**
Create API endpoints for course browsing and management. Currently, all course data is hardcoded in `/src/lib/data.ts`.

**Tasks:**
- [ ] Create validation schemas (`src/lib/validations/course.ts`)
- [ ] **Public Course Endpoints:**
  - [ ] `GET /api/courses` - List all courses (public)
    - [ ] Pagination: ?page=1&limit=12
    - [ ] Filter by: category, level, price (free/paid), featured
    - [ ] Search by: title, description, instructor
    - [ ] Sort by: popularity, price, rating, createdAt
    - [ ] Include: lesson count, student count, average rating
    - [ ] Return total count for pagination
  - [ ] `GET /api/courses/:id` - Get single course details (public)
    - [ ] Include course metadata
    - [ ] Include lessons list (titles only, not video URLs)
    - [ ] Include instructor info
    - [ ] Include average rating and review count
    - [ ] Don't expose paid lesson content
  - [ ] `GET /api/courses/:slug` - Get course by slug (public)
    - [ ] Same as above but by slug instead of ID
- [ ] **Admin Course Management:**
  - [ ] `POST /api/admin/courses` - Create new course (admin only)
    - [ ] Validate all fields with Zod
    - [ ] Generate slug from title
    - [ ] Upload thumbnail (if provided)
    - [ ] Set default values
  - [ ] `PUT /api/admin/courses/:id` - Update course (admin only)
    - [ ] Validate updates
    - [ ] Update slug if title changes
    - [ ] Handle thumbnail replacement
  - [ ] `DELETE /api/admin/courses/:id` - Delete course (admin only)
    - [ ] Soft delete (set status to 'deleted')
    - [ ] Don't delete if students are enrolled (return error)
- [ ] **Course Lessons Endpoint:**
  - [ ] `GET /api/courses/:id/lessons` - List lessons for a course
    - [ ] If not authenticated: show only free lessons
    - [ ] If authenticated but not enrolled: show lesson titles only
    - [ ] If enrolled: show all lessons with full details
- [ ] Add error handling for all endpoints
- [ ] Optimize queries with Prisma (use `include` for related data)

**Acceptance Criteria:**
- ✅ Public can browse courses without authentication
- ✅ Course filtering and search work efficiently
- ✅ Pagination works correctly
- ✅ Admin can create, update, delete courses
- ✅ Slug generation is unique
- ✅ Lessons are properly filtered based on access
- ✅ Proper error messages for invalid data
- ✅ Response includes all necessary related data

**Dependencies:**
- Issue #1 (Database Setup)
- Issue #3 (Authentication Middleware)

---

### Issue #6: Enrollment and Progress Tracking API
**Title**: [Foundation] Build Enrollment and Progress Tracking API
**Labels**: `priority:critical`, `phase:1-foundation`, `backend`
**Assignee**: Backend Developer
**Estimated Effort**: 4-5 days

**Description:**
Create API endpoints for course enrollments and lesson progress tracking. Currently, all progress is hardcoded and doesn't persist.

**Tasks:**
- [ ] Create validation schemas (`src/lib/validations/enrollment.ts`)
- [ ] **Enrollment Endpoints:**
  - [ ] `POST /api/enrollments` - Enroll in a course
    - [ ] Check user authentication
    - [ ] Verify user has active subscription OR course is free
    - [ ] Check for duplicate enrollment (prevent re-enrollment)
    - [ ] Create enrollment record with progress=0
    - [ ] Return enrollment details
  - [ ] `GET /api/enrollments` - Get user's enrolled courses
    - [ ] Filter by: status (in-progress, completed)
    - [ ] Include course details
    - [ ] Include progress percentage
    - [ ] Sort by: enrolledAt, progress, completedAt
  - [ ] `GET /api/enrollments/:courseId` - Get specific enrollment details
    - [ ] Return enrollment with course details
    - [ ] Return lesson progress for all lessons
    - [ ] Calculate overall progress
  - [ ] `DELETE /api/enrollments/:courseId` - Unenroll from course
    - [ ] Soft delete enrollment
    - [ ] Keep progress data (don't delete)
- [ ] **Progress Tracking Endpoints:**
  - [ ] `POST /api/progress/lessons/:lessonId/complete` - Mark lesson as complete
    - [ ] Check user is enrolled in course
    - [ ] Validate lesson belongs to course
    - [ ] Create/update LessonProgress record
    - [ ] Mark completed = true, set completedAt
    - [ ] Recalculate course progress
    - [ ] If all lessons complete, mark enrollment as completed
  - [ ] `PUT /api/progress/lessons/:lessonId` - Update watch time
    - [ ] Accept: watchTime (seconds), lastPosition (seconds)
    - [ ] Update LessonProgress record
    - [ ] Auto-complete if watchTime >= 90% of duration
  - [ ] `GET /api/progress/courses/:courseId` - Get course progress
    - [ ] Return all lesson progress for the course
    - [ ] Calculate overall progress percentage
    - [ ] Return completed lesson count
    - [ ] Return total watch time
- [ ] **Business Logic:**
  - [ ] Progress calculation: (completed lessons / total lessons) * 100
  - [ ] Auto-complete lesson if 90% watched
  - [ ] Mark course complete when all lessons complete
  - [ ] Issue certificate when course complete (placeholder for now)
- [ ] Add validation to prevent progress manipulation
  - [ ] Validate user owns the enrollment
  - [ ] Validate lesson belongs to course
  - [ ] Validate watchTime doesn't exceed lesson duration

**Acceptance Criteria:**
- ✅ Users can enroll in courses they have access to
- ✅ Duplicate enrollments are prevented
- ✅ Free courses can be accessed without subscription
- ✅ Paid courses require active subscription
- ✅ Progress tracking updates correctly
- ✅ Course completion is calculated accurately
- ✅ Cannot mark lessons complete without proper access
- ✅ Watch time updates save correctly
- ✅ Progress percentage is accurate

**Dependencies:**
- Issue #1 (Database Setup)
- Issue #3 (Authentication Middleware)
- Issue #5 (Course API)

---

## HIGH PRIORITY - Phase 2: Payments

### Issue #7: Stripe Integration Setup
**Title**: [Payments] Integrate Stripe for payment processing
**Labels**: `priority:high`, `phase:2-payments`, `backend`
**Assignee**: Backend Developer
**Estimated Effort**: 2-3 days

**Description:**
Set up Stripe integration for handling subscriptions and payments. Currently, the pricing page has no checkout functionality.

**Tasks:**
- [ ] Create Stripe account (or use existing)
- [ ] Get API keys from Stripe Dashboard
- [ ] Install Stripe dependencies:
  ```bash
  npm install stripe @stripe/stripe-js
  ```
- [ ] Create Stripe client (`src/lib/stripe.ts`):
  ```typescript
  import Stripe from 'stripe';
  export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  ```
- [ ] Configure environment variables in `.env`:
  ```
  STRIPE_SECRET_KEY=sk_test_...
  STRIPE_PUBLISHABLE_KEY=pk_test_...
  STRIPE_WEBHOOK_SECRET=whsec_...
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
  ```
- [ ] Create Stripe products and prices:
  - [ ] **Basic Plan**: $29/month (product ID, price ID)
  - [ ] **Pro Plan**: $79/month (product ID, price ID)
  - [ ] **Enterprise Plan**: $299/month (product ID, price ID)
  - [ ] Store price IDs in environment or database
- [ ] Set up Stripe webhook endpoint locally:
  - [ ] Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
  - [ ] Forward events: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- [ ] Test Stripe connection with test API call

**Acceptance Criteria:**
- ✅ Stripe API keys are configured correctly
- ✅ Products are created in Stripe Dashboard
- ✅ Price IDs are accessible in application
- ✅ Stripe CLI forwards webhook events successfully
- ✅ Environment variables are documented
- ✅ Test API call succeeds

**Dependencies:**
- Issue #1 (Database Setup) - will store subscription data

---

### Issue #8: Subscription Checkout and Management
**Title**: [Payments] Build subscription checkout and management
**Labels**: `priority:high`, `phase:2-payments`, `backend`
**Assignee**: Backend Developer
**Estimated Effort**: 5-6 days

**Description:**
Implement subscription checkout flow and subscription management with Stripe. Currently, pricing page buttons don't do anything.

**Tasks:**
- [ ] **Checkout Endpoints:**
  - [ ] `POST /api/payments/create-checkout-session`
    - [ ] Accept: planId (basic/pro/enterprise)
    - [ ] Get or create Stripe customer for user
    - [ ] Create Stripe Checkout Session:
      - [ ] mode: 'subscription'
      - [ ] line_items with price ID
      - [ ] success_url: `/member/dashboard?success=true`
      - [ ] cancel_url: `/pricing?canceled=true`
      - [ ] customer_email or customer ID
      - [ ] metadata: userId, planId
    - [ ] Return checkout URL
  - [ ] `GET /api/payments/subscription` - Get current subscription
    - [ ] Query Subscriptions table for active subscription
    - [ ] Return subscription details and status
  - [ ] `POST /api/payments/create-portal-session`
    - [ ] Create Stripe Customer Portal session
    - [ ] return_url: `/member/dashboard`
    - [ ] Return portal URL (for managing subscription)
- [ ] **Webhook Handler:**
  - [ ] `POST /api/webhooks/stripe` - Handle Stripe webhooks
    - [ ] Verify webhook signature
    - [ ] Handle event types:
      - [ ] `checkout.session.completed`:
        - [ ] Extract customer, subscription ID
        - [ ] Create Subscription record in database
        - [ ] Update user's plan
        - [ ] Send confirmation email (Issue #14)
      - [ ] `customer.subscription.updated`:
        - [ ] Update subscription record
        - [ ] Update user's plan
      - [ ] `customer.subscription.deleted`:
        - [ ] Mark subscription as cancelled
        - [ ] Update user's plan to 'free'
        - [ ] Send cancellation email
      - [ ] `invoice.payment_succeeded`:
        - [ ] Create Payment record
        - [ ] Send receipt email
      - [ ] `invoice.payment_failed`:
        - [ ] Mark subscription as past_due
        - [ ] Send payment failed email
    - [ ] Return 200 OK response
- [ ] **Frontend Integration:**
  - [ ] Update pricing page to call checkout API
  - [ ] Redirect to Stripe Checkout on button click
  - [ ] Handle success/cancel return URLs
  - [ ] Add "Manage Subscription" button in member dashboard
  - [ ] Link to customer portal for subscription management
- [ ] Add Subscriptions table to database (if not in Issue #1):
  ```prisma
  model Subscription {
    id                    String   @id @default(cuid())
    userId                String
    user                  User     @relation(fields: [userId], references: [id])
    plan                  String   // 'basic', 'pro', 'enterprise'
    status                String   // 'active', 'canceled', 'past_due', 'incomplete'
    stripeCustomerId      String
    stripeSubscriptionId  String   @unique
    stripePriceId         String
    currentPeriodStart    DateTime
    currentPeriodEnd      DateTime
    cancelAtPeriodEnd     Boolean  @default(false)
    createdAt             DateTime @default(now())
    updatedAt             DateTime @updatedAt
  }
  ```
- [ ] Test entire flow:
  - [ ] Checkout with test card
  - [ ] Webhook receives events
  - [ ] Database updates correctly
  - [ ] User access is granted

**Acceptance Criteria:**
- ✅ Users can click pricing button and checkout
- ✅ Stripe Checkout session opens correctly
- ✅ Test payment succeeds (card: 4242 4242 4242 4242)
- ✅ Webhook receives checkout.session.completed event
- ✅ Database subscription record is created
- ✅ User's plan is updated
- ✅ Payment history is recorded
- ✅ Customer portal works for managing subscription
- ✅ Subscription cancellation works
- ✅ Failed payments are handled gracefully

**Dependencies:**
- Issue #7 (Stripe Integration)
- Issue #1 (Database Setup)
- Issue #3 (Authentication Middleware)

---

### Issue #9: Subscription Access Middleware
**Title**: [Payments] Add middleware to enforce subscription access
**Labels**: `priority:high`, `phase:2-payments`, `backend`
**Assignee**: Backend Developer
**Estimated Effort**: 2-3 days

**Description:**
Create middleware to check user subscription status and enforce access control to paid content. Currently, lesson pages show all content regardless of subscription.

**Tasks:**
- [ ] Create subscription validation helper (`src/lib/subscription.ts`)
  - [ ] Function: `hasActiveSubscription(userId)` - Check if user has active subscription
  - [ ] Function: `canAccessCourse(userId, courseId)` - Check if user can access course
  - [ ] Function: `canAccessLesson(userId, lessonId)` - Check if user can access lesson
- [ ] Add subscription middleware to course/lesson API routes
- [ ] **Access Logic:**
  - [ ] Free courses/lessons: accessible to all authenticated users
  - [ ] Paid courses: require active subscription (status = 'active')
  - [ ] Paid lessons: require active subscription
  - [ ] Grace period: 3 days after subscription ends (currentPeriodEnd + 3 days)
- [ ] Return proper error responses:
  - [ ] 401 Unauthorized: user not authenticated
  - [ ] 402 Payment Required: no active subscription
  - [ ] 403 Forbidden: subscription doesn't include this content
- [ ] Add subscription status to user session
- [ ] Update frontend to check subscription before rendering content
- [ ] Show upgrade prompt for users without subscription

**Acceptance Criteria:**
- ✅ Free courses/lessons are accessible to all authenticated users
- ✅ Paid content requires active subscription
- ✅ Proper error messages when subscription is missing
- ✅ Grace period works correctly (3 days)
- ✅ Subscription tier is checked for premium content
- ✅ Frontend shows upgrade prompt when needed
- ✅ No performance impact from subscription checks

**Dependencies:**
- Issue #8 (Subscription Management)
- Issue #3 (Authentication Middleware)
- Issue #6 (Enrollment API)

---

## HIGH PRIORITY - Phase 3: Video Streaming

### Issue #10: Mux Video Streaming Integration
**Title**: [Video] Integrate Mux for video streaming
**Labels**: `priority:high`, `phase:3-video`, `backend`
**Assignee**: Backend Developer
**Estimated Effort**: 3-4 days

**Description:**
Integrate Mux for video upload, encoding, and streaming. Currently, the lesson viewer shows a black placeholder box.

**Tasks:**
- [ ] Create Mux account at https://mux.com
- [ ] Get API credentials from Mux Dashboard
- [ ] Install Mux SDK:
  ```bash
  npm install @mux/mux-node @mux/mux-player-react
  ```
- [ ] Configure environment variables:
  ```
  MUX_TOKEN_ID=...
  MUX_TOKEN_SECRET=...
  MUX_WEBHOOK_SECRET=...
  ```
- [ ] Create Mux client (`src/lib/mux.ts`):
  ```typescript
  import Mux from '@mux/mux-node';
  export const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
  });
  ```
- [ ] **Upload Endpoints:**
  - [ ] `POST /api/admin/videos/upload-url` - Generate Mux direct upload URL
    - [ ] Create Mux Direct Upload
    - [ ] Return upload URL and upload ID
    - [ ] Store upload ID temporarily (for webhook)
  - [ ] `GET /api/admin/videos/:uploadId/status` - Check upload status
    - [ ] Query Mux API for upload status
    - [ ] Return status (waiting, asset_created, errored)
- [ ] **Webhook Handler:**
  - [ ] `POST /api/webhooks/mux` - Handle Mux webhooks
    - [ ] Verify webhook signature
    - [ ] Handle event types:
      - [ ] `video.asset.ready`:
        - [ ] Extract asset ID and playback ID
        - [ ] Update Lesson record with muxAssetId and muxPlaybackId
        - [ ] Extract video duration
      - [ ] `video.asset.errored`:
        - [ ] Log error
        - [ ] Notify admin
    - [ ] Return 200 OK
- [ ] **Streaming Endpoint:**
  - [ ] `GET /api/lessons/:id/stream` - Get streaming URL with access control
    - [ ] Verify user is authenticated
    - [ ] Verify user has access to lesson (enrolled or lesson is free)
    - [ ] Return Mux playback ID
    - [ ] (Optional) Generate signed playback URL for extra security
- [ ] Update Lessons table schema:
  ```prisma
  model Lesson {
    // ... existing fields
    muxAssetId     String?
    muxPlaybackId  String?
    uploadId       String?
  }
  ```
- [ ] Test video upload:
  - [ ] Upload test video via direct upload
  - [ ] Verify webhook is received
  - [ ] Verify playback ID is stored
  - [ ] Test streaming playback

**Acceptance Criteria:**
- ✅ Mux API is connected and working
- ✅ Upload URLs are generated successfully
- ✅ Videos upload and encode automatically
- ✅ Playback IDs are stored in database
- ✅ Streaming URLs are protected by authentication
- ✅ Webhook events update database correctly
- ✅ Video duration is captured
- ✅ Test video streams successfully

**Dependencies:**
- Issue #1 (Database Setup)
- Issue #5 (Course API)

---

### Issue #11: Video Player with Progress Tracking
**Title**: [Video] Build video player with progress tracking
**Labels**: `priority:high`, `phase:3-video`, `frontend`
**Assignee**: Frontend Developer
**Estimated Effort**: 4-5 days

**Description:**
Replace placeholder video player with real Mux player and implement progress tracking. Currently, lesson viewer shows a black box with a play button.

**Tasks:**
- [ ] Install Mux Player React: `npm install @mux/mux-player-react`
- [ ] Update lesson viewer page (`/member/courses/[slug]/[lesson]/page.tsx`)
- [ ] Replace placeholder `<div>` with `<MuxPlayer>`
- [ ] Configure Mux Player:
  ```typescript
  <MuxPlayer
    playbackId={lesson.muxPlaybackId}
    streamType="on-demand"
    controls
    metadata={{
      video_title: lesson.title,
      viewer_user_id: user.id,
    }}
    onTimeUpdate={handleTimeUpdate}
    onEnded={handleVideoEnded}
    onPause={handlePause}
  />
  ```
- [ ] Implement progress tracking:
  - [ ] Track current time every 10 seconds
  - [ ] Call API to save progress: `PUT /api/progress/lessons/:id`
  - [ ] Send: `{ watchTime: currentTime, lastPosition: currentTime }`
  - [ ] Debounce progress updates to avoid too many API calls
- [ ] Resume from last position:
  - [ ] Fetch last position on component mount
  - [ ] Set player currentTime to lastPosition
  - [ ] Show "Resume from X:XX" button (optional)
- [ ] Auto-complete lesson:
  - [ ] When video ends or 90% watched
  - [ ] Call API: `POST /api/progress/lessons/:id/complete`
  - [ ] Show completion animation/notification
  - [ ] Update UI to show lesson as complete
- [ ] Handle video errors:
  - [ ] Show error message if video fails to load
  - [ ] Retry button
  - [ ] Report error to admin (optional)
- [ ] Add player features:
  - [ ] Quality selector (Mux handles automatically)
  - [ ] Playback speed control
  - [ ] Fullscreen support
  - [ ] Keyboard shortcuts (space to play/pause, arrow keys to skip)
- [ ] Update lesson sidebar to reflect completion status
- [ ] Add loading state while video loads

**Acceptance Criteria:**
- ✅ Videos play correctly from Mux
- ✅ Progress is saved every 10 seconds
- ✅ Resume from last position works on reload
- ✅ Lessons mark complete when 90% watched
- ✅ Video errors display user-friendly messages
- ✅ Quality selection works
- ✅ Playback controls work as expected
- ✅ Keyboard shortcuts work
- ✅ Loading state shows before video ready

**Dependencies:**
- Issue #10 (Mux Integration)
- Issue #6 (Progress Tracking API)

---

### Issue #12: Admin Video Upload Interface
**Title**: [Video] Build admin video upload interface
**Labels**: `priority:high`, `phase:3-video`, `frontend`
**Assignee**: Frontend Developer
**Estimated Effort**: 3-4 days

**Description:**
Create admin interface for uploading videos when creating/editing lessons. Currently, admin lesson page has no video upload.

**Tasks:**
- [ ] Add video upload section to lesson creation/edit form
- [ ] Install upload library: `npm install react-dropzone`
- [ ] Create video upload component:
  - [ ] Drag-and-drop zone
  - [ ] File browser fallback
  - [ ] File type validation (mp4, mov, avi, mkv)
  - [ ] File size validation (max 5GB)
  - [ ] Preview of selected file
- [ ] Implement upload flow:
  1. [ ] User selects video file
  2. [ ] Call API to get upload URL: `POST /api/admin/videos/upload-url`
  3. [ ] Upload file directly to Mux using upload URL
  4. [ ] Show upload progress (percentage)
  5. [ ] Poll for encoding status: `GET /api/admin/videos/:uploadId/status`
  6. [ ] Show encoding progress
  7. [ ] When complete, save lesson with muxAssetId
- [ ] Display upload states:
  - [ ] Idle: "Drop video here or click to browse"
  - [ ] Uploading: Progress bar with percentage
  - [ ] Encoding: "Processing video..." with spinner
  - [ ] Complete: Video thumbnail with ✓ icon
  - [ ] Error: Error message with retry button
- [ ] Allow video replacement:
  - [ ] Show current video thumbnail if exists
  - [ ] "Replace video" button
  - [ ] Confirm before replacing
- [ ] Show video metadata after upload:
  - [ ] Duration (from Mux)
  - [ ] Resolution
  - [ ] Thumbnail preview
- [ ] Handle upload errors:
  - [ ] File too large
  - [ ] Invalid file type
  - [ ] Upload failed
  - [ ] Encoding failed

**Acceptance Criteria:**
- ✅ Admins can upload videos via drag-and-drop or file browser
- ✅ Upload progress shows percentage
- ✅ Encoding status updates automatically
- ✅ Only valid video files are accepted
- ✅ File size limit is enforced (5GB)
- ✅ Errors are displayed clearly with retry option
- ✅ Video thumbnail shows after successful upload
- ✅ Video replacement works
- ✅ Duration is captured and displayed

**Dependencies:**
- Issue #10 (Mux Integration)

---

## MEDIUM PRIORITY - Phase 4: Email & Notifications

### Issue #13: SendGrid Email Service Integration
**Title**: [Email] Integrate SendGrid for transactional emails
**Labels**: `priority:medium`, `phase:4-email`, `backend`
**Assignee**: Backend Developer
**Estimated Effort**: 3-4 days

**Description:**
Set up SendGrid for sending transactional emails. Currently, admin settings page has SMTP configuration UI but it's non-functional.

**Tasks:**
- [ ] Create SendGrid account at https://sendgrid.com
- [ ] Verify sender email/domain in SendGrid
- [ ] Get API key from SendGrid Dashboard
- [ ] Install SendGrid SDK: `npm install @sendgrid/mail`
- [ ] Configure environment variable:
  ```
  SENDGRID_API_KEY=SG...
  SENDGRID_FROM_EMAIL=noreply@yourdomain.com
  SENDGRID_FROM_NAME="Premium Course Platform"
  ```
- [ ] Create email service helper (`src/lib/email.ts`):
  ```typescript
  import sgMail from '@sendgrid/mail';
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  export async function sendEmail(to, subject, html) {
    const msg = {
      to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL!,
        name: process.env.SENDGRID_FROM_NAME!,
      },
      subject,
      html,
    };
    await sgMail.send(msg);
  }
  ```
- [ ] Create email templates (`src/emails/templates/`):
  - [ ] `welcome.ts` - Welcome email
  - [ ] `email-verification.ts` - Email verification
  - [ ] `password-reset.ts` - Password reset
  - [ ] `enrollment-confirmation.ts` - Course enrollment confirmation
  - [ ] `course-completion.ts` - Course completion with certificate
  - [ ] `payment-receipt.ts` - Payment receipt
  - [ ] `subscription-renewal.ts` - Subscription renewal reminder
  - [ ] `subscription-cancelled.ts` - Subscription cancellation
- [ ] Use template system (plain HTML or React Email):
  - [ ] Option 1: Plain HTML with template literals
  - [ ] Option 2: React Email (`npm install react-email`) for better DX
- [ ] Add email queue (optional but recommended):
  - [ ] Use Bull queue with Redis
  - [ ] Retry failed emails
  - [ ] Track email delivery status
- [ ] Test email sending:
  - [ ] Send test email
  - [ ] Verify delivery
  - [ ] Check spam score

**Acceptance Criteria:**
- ✅ SendGrid API is connected
- ✅ Sender domain is verified
- ✅ Email templates are created and look professional
- ✅ Emails send successfully
- ✅ Email service helper is reusable
- ✅ Errors are handled gracefully
- ✅ Emails don't go to spam

**Dependencies:**
- None (can be done in parallel)

---

(Continue with remaining issues #14-28 following the same structure...)

---

## Issue Priority Summary

### CRITICAL (Must have for MVP):
1. ✅ Issue #1: Database Setup
2. ✅ Issue #2: Authentication System
3. ✅ Issue #3: Route Protection
4. ✅ Issue #4: User API
5. ✅ Issue #5: Course API
6. ✅ Issue #6: Enrollment API
7. ✅ Issue #7: Stripe Setup
8. ✅ Issue #8: Subscription Management
9. ✅ Issue #9: Subscription Access Control
10. ✅ Issue #10: Mux Integration
11. ✅ Issue #11: Video Player
12. ✅ Issue #12: Video Upload UI

### HIGH (Important for production):
13. ✅ Issue #13: SendGrid Integration
14. ✅ Issue #14: Email Workflows
15. ✅ Issue #15: Input Validation
16. ✅ Issue #16: Security Headers
17. ✅ Issue #17: Redis Caching
18. ✅ Issue #18: Performance Optimization

### MEDIUM (Nice to have):
19. ✅ Issue #19: Sentry Error Tracking
20. ✅ Issue #20: Logging Infrastructure
21. ✅ Issue #21: Form Validation (client-side)
22. ✅ Issue #22: Accessibility
23. ✅ Issue #23: Loading States

### LOW (Future enhancements):
24. ✅ Issue #24: User Profile Page
25. ✅ Issue #25: Course Reviews
26. ✅ Issue #26: Search Functionality
27. ✅ Issue #27: Analytics Dashboard
28. ✅ Issue #28: .env.example Documentation

---

## Development Timeline

### Sprint 1 (Weeks 1-2): Foundation
- Issues #1-6 (Database, Auth, APIs)

### Sprint 2 (Weeks 3-4): Payments & Video
- Issues #7-12 (Stripe, Mux, Video Player)

### Sprint 3 (Weeks 5-6): Email & Security
- Issues #13-18 (SendGrid, Validation, Performance)

### Sprint 4 (Weeks 7-8): Polish & Testing
- Issues #19-23 (Monitoring, UX, Testing)

### Post-MVP (Weeks 9+): Enhancements
- Issues #24-28 (Profile, Reviews, Search, Analytics)

---

**Total Estimated Effort**: 10-12 weeks with 2 developers
**Minimum Viable Product**: First 18 issues (8-10 weeks)
