import type { Metadata } from 'next';
import './globals.css';
import { TRPCReactProvider } from '@/trpc/client';

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
      <body suppressHydrationWarning={true}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
