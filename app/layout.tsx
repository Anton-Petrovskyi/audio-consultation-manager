import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Willy AI',
  description: 'Willy AI | Home page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
