'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { authOptions } from '@/lib/auth';
import useCurrentUser from '@/hooks/useCurrentUser';

import Avatar from '@/components/Avatar';

const ProfilePage = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth');
    },
  });

  const { user } = useCurrentUser();

  return (
    <div className='flex flex-row items-center h-full justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-6xl text-white text-center'>
          Who is watching?
        </h1>
        <div className='flex flex-row items-center justify-center gap-8 mt-10'>
          <Avatar name={user?.name} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
