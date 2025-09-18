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
  title: "Ханойская башня - Классическая головоломка онлайн",
  description: "Играйте в Ханойскую башню онлайн. Бесплатная головоломка с современным интерфейсом, анимациями и звуковыми эффектами.",
  keywords: "ханойская башня, головоломка, игра, логика, puzzle, tower of hanoi",
  openGraph: {
    title: "Ханойская башня",
    description: "Классическая головоломка с современным интерфейсом",
    type: "website",
    url: "https://hanoi-tower.vercel.app",
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
