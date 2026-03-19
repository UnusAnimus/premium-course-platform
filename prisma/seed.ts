import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { courses as seedCourses, lessons as seedLessons, users as seedUsers } from "../src/lib/data";

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Courses ────────────────────────────────────────────────────────────────
  const levelMap: Record<string, "Beginner" | "Intermediate" | "Advanced"> = {
    Beginner: "Beginner",
    Intermediate: "Intermediate",
    Advanced: "Advanced",
  };

  const categoryMap: Record<string, string> = {
    "React": "Frontend",
    "Next.js": "Fullstack",
    "TypeScript": "Languages",
    "System Design": "Architecture",
    "Node.js": "Backend",
    "DevOps": "DevOps",
    "Python": "Data Science",
    "Web3": "Blockchain",
  };

  const createdCourses: Record<string, string> = {};

  for (const c of seedCourses) {
    const firstTag = c.tags[0] ?? "";
    const category = categoryMap[firstTag] ?? "General";
    const level = levelMap[c.level as string] ?? "Beginner";

    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        title: c.title,
        slug: c.slug,
        description: c.description,
        instructor: c.instructor,
        category,
        level,
        price: c.price,
        thumbnail: c.thumbnail,
        featured: c.featured,
      },
    });
    createdCourses[c.id] = course.id;
    console.log(`  ✅ Course: ${course.title}`);
  }

  // ── Lessons ────────────────────────────────────────────────────────────────
  for (const l of seedLessons) {
    const courseId = createdCourses[l.courseId];
    if (!courseId) continue;

    await prisma.lesson.upsert({
      where: { courseId_slug: { courseId, slug: l.slug } },
      update: {},
      create: {
        courseId,
        title: l.title,
        slug: l.slug,
        description: l.description,
        videoUrl: l.videoUrl,
        duration: l.duration,
        order: l.order,
        isFree: l.isFree,
      },
    });
    console.log(`  ✅ Lesson: ${l.title}`);
  }

  // ── Users ──────────────────────────────────────────────────────────────────
  const planMap: Record<string, "basic" | "pro" | "enterprise"> = {
    Basic: "basic",
    Pro: "pro",
    Enterprise: "enterprise",
  };

  for (const u of seedUsers) {
    const plan = planMap[u.plan as string] ?? "basic";

    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        // Placeholder hash — replace with bcrypt hash before enabling auth
        password: "$2b$10$placeholder.hash.not.for.production",
        name: u.name,
        role: "user",
        plan,
      },
    });
    console.log(`  ✅ User: ${u.name} (${plan})`);
  }

  // ── Admin user ─────────────────────────────────────────────────────────────
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      // Placeholder hash — replace with bcrypt hash before enabling auth
      password: "$2b$10$placeholder.hash.not.for.production",
      name: "Admin",
      role: "admin",
      plan: "enterprise",
    },
  });
  console.log("  ✅ Admin user: admin@example.com");

  console.log("✨ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
