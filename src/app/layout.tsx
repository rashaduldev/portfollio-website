import "./globals.css";
import type { Metadata } from "next";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Md Rashadul Islam – Portfolio",
  description:
    "Frontend Developer Portfolio showcasing projects, skills, and experience of Md Rashadul Islam.",
  keywords: [
    "Md Rashadul Islam",
    "Frontend Developer",
    "Best Frontend Developer",
    "Bangladesh Frontend Developer",
    "Bangladesh Frontend Developer",
    "Bangladesh Best Frontend Developer",
    "React Developer",
    "Portfolio",
    "JavaScript",
    "Next.js",
    "Web Developer in Bangladesh",
  ],
  authors: [
    { name: "Md Rashadul Islam", url: "https://rashaduldev01.vercel.app" },
  ],
  creator: "Md Rashadul Islam",
  metadataBase: new URL("https://rashaduldev01.vercel.app"),
  openGraph: {
    title: "Md Rashadul Islam – Frontend Developer Portfolio",
    description:
      "Explore the professional portfolio of Md Rashadul Islam, a passionate frontend developer specialized in React and modern web technologies.",
    url: "https://rashaduldev01.vercel.app",
    siteName: "Md Rashadul Islam Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/de8yddexc/image/upload/v1747461829/resume/banner.png",
        width: 1200,
        height: 630,
        alt: "Md Rashadul Islam Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Rashadul Islam – Frontend Developer Portfolio",
    description:
      "Portfolio of Md Rashadul Islam, featuring web development projects and skills.",
    creator: "@rashaduldev",
    images: [
      "https://res.cloudinary.com/de8yddexc/image/upload/v1747461829/resume/banner.png",
    ],
  },
  // Remove themeColor from here
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

// Add this function below metadata export:
export function generateViewport() {
  return {
    themeColor: "#0f172a",
    // You can add other viewport properties here if needed
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
