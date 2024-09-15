import type { Metadata } from "next";
import { Inter, Noto_Serif, Playfair_Display } from "next/font/google";
import { ToastContainer } from "react-toastify";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { Analytics } from "@vercel/analytics/react";

import "@/assets/css/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/css/custom.css";
import "@/assets/scss/style.scss";
import "@/assets/scss/tiptap.scss";

const inter = Inter({ subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"] });
const notoSerif = Noto_Serif({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Educative | Best Place to Learn",
  description:
    "The Educative is the best place to learn. We provide the best courses for you to learn and grow. We have the best teachers and the best courses for you to learn.",
  applicationName: "The Educative",
  keywords: [
    "The Educative",
    "Best Place to Learn",
    "Best Courses",
    "Best Teachers",
  ],
  robots: "index, follow",
  generator: "Chat GPT",
  icons: [
    {
      href: "/favicon.ico",
      sizes: "16x16",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
  ],
  openGraph: {
    title: "The Educative | Best Place to Learn",
    description:
      "The Educative is the best place to learn. We provide the best courses for you to learn and grow. We have the best teachers and the best courses for you to learn.",
    type: "website",
    url: "https://www.codes.engineer",
    siteName: "The Educative",
    images: [
      {
        url: "https://www.codes.engineer/images/resources/placeholder.png",
        width: 600,
        height: 300,
        alt: "The Educative | Best Place to Learn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Educative | Best Place to Learn",
    description:
      "The Educative is the best place to learn. We provide the best courses for you to learn and grow. We have the best teachers and the best courses for you to learn.",
    images: [
      {
        url: "https://www.codes.engineer/images/resources/placeholder.png",
        width: 600,
        height: 300,
        alt: "The Educative | Best Place to Learn",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={`bg-primary text-white ${notoSerif.className}`}>
          <ToastContainer />
          {children}
          <Analytics />
        </body>
      </html>
    </NextAuthProvider>
  );
}
