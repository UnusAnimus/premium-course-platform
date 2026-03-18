import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AcademyPro - Premium Learning Platform",
  description: "Master the future. Learn from the best instructors in the industry with world-class courses.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-[#f0f0f0] antialiased min-h-screen">{children}</body>
    </html>
  );
}
