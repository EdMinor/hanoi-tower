import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hanoi-tower.vercel.app'),
  title: "Ханойская башня - Классическая головоломка онлайн",
  description: "Играйте в Ханойскую башню онлайн. Бесплатная головоломка с современным интерфейсом, анимациями и звуковыми эффектами. Развивайте логическое мышление!",
  keywords: "ханойская башня, головоломка, игра, логика, puzzle, tower of hanoi, математика, логическое мышление, развивающие игры",
  authors: [{ name: "EdMin", url: "https://edmin.dev" }],
  creator: "EdMin",
  publisher: "EdMin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ханойская башня - Классическая головоломка онлайн",
    description: "Играйте в Ханойскую башню онлайн. Бесплатная головоломка с современным интерфейсом, анимациями и звуковыми эффектами.",
    type: "website",
    url: "https://hanoi-tower.vercel.app",
    siteName: "Ханойская башня",
    locale: "ru_RU",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Ханойская башня - Классическая головоломка",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ханойская башня - Классическая головоломка онлайн",
    description: "Играйте в Ханойскую башню онлайн. Бесплатная головоломка с современным интерфейсом, анимациями и звуковыми эффектами.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://hanoi-tower.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
