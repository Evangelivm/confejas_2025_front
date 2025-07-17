import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Confejas 2025 Lima Este",
  description: " Sistema de la Confejas 2025 Lima Este",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <Toaster position="top-center" richColors />
      <body>{children}</body>
    </html>
  );
}
