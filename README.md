# premium-course-platform
Premium course platform with public pages, membership area, super admin dashboard, design settings, and modern 3D-driven UI built for scalable customization.

## Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Available Pages

| Route | Description |
|---|---|
| `/` | Home / Landing page |
| `/courses` | Course catalog |
| `/pricing` | Pricing plans |
| `/about` | About page |
| `/contact` | Contact page |
| `/member/login` | Member login |
| `/member/dashboard` | Member dashboard |
| `/admin/dashboard` | Super admin dashboard |

### Build for Production

```bash
npm run build
npm run start
```

### Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript
