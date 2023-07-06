import './globals.css';
import { Inter } from 'next/font/google';

import ToasterProvider from '@/providers/ToasterProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Netflix Clone',
  description: 'Netflix Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
