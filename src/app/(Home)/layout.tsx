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
        <title>
          FaceShield | Unlock with Confidence - Your Face, Your Key!
        </title>
        <meta
          name="description"
          content="FaceShield is a cutting-edge facial authentication system using AI-driven face recognition technology. It provides secure, fast, and reliable identity verification for access control. Powered by deep learning and ResNet-based facial embeddings, FaceShield ensures high accuracy and real-time processing for businesses and personal security solutions. Optimize your security with FaceShield today!"
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
