import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Gemini Chatbot",
    description: "Gemini APIを利用したチャットボットアプリです。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="">{children}</body>
        </html>
    );
}