"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthProvider";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <title>FaceEntry | Your Face is the Key.</title>
        <meta
          name="description"
          content="FaceEntry is an AI-driven society security solution that uses facial data to manage resident entries and log visitor activity. Easy to use. Hard to breach."
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <Header />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Component>{children}</Component>
    </AuthProvider>
  );
}
