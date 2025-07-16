import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
