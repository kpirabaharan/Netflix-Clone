'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth');
    },
  });

  return (
    <div className='h-[120vh]'>
      <Navbar />
    </div>
  );
}
