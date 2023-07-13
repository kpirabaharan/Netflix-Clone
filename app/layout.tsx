import './globals.css';
import { Inter } from 'next/font/google';

import SessionProvider from '@/providers/SessionProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import ModalProvider from '@/providers/ModalProvider';

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
        <ModalProvider />
        <SessionProvider>
          <ToasterProvider />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
