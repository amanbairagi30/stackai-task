import type { Metadata } from "next";
import { Geist, Host_Grotesk } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/provider";

const hostGrotesk = Host_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StackAI",
  description: "StackAI is a platform for building AI integrations.",
  keywords: ["StackAI", "AI", "Integrations", "Tools", "API", "Automation"],
  authors: [{ name: "StackAI", url: "https://stackai.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${hostGrotesk.variable} font-primary antialiased`}
      >
        <Provider>
          <main className="">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
