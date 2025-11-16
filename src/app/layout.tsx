// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ProvidersClientOnly } from '@/Provider/ProvidersClientOnly';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProvidersClientOnly>
          {children}
        </ProvidersClientOnly>
      </body>
    </html>
  );
}
