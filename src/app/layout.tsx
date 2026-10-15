import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Radeon RX 9070 XT ár-összehasonlító',
  description: 'Hasonlítsd össze a Radeon RX 9070 XT magyarországi ajánlatait egy helyen.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
