'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import useCurrentUser from '@/hooks/useCurrentUser';

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth');
    },
  });

  const { user, error, isLoading, mutate } = useCurrentUser();

  return (
    <>
      <h1 className='text-2xl text-red-500'>Netflix Clone</h1>
      <p className='text-white'>Logged in as {user?.name}</p>
      <button className='h-10 w-full bg-white' onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}
