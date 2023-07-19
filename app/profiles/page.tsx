import { redirect } from 'next/navigation';

import { User } from '@/types';
import getCurrentUser from '@/actions/getCurrentUser';

import Avatar from '@/components/Avatar';

export const revalidate = 0;

const ProfilePage = async () => {
  const user = (await getCurrentUser()) as User;

  if (!user) {
    return redirect('/auth');
  }

  return (
    <div className='flex flex-row items-center h-full justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-6xl text-white text-center'>
          Who is watching?
        </h1>
        <div className='flex flex-row items-center justify-center gap-8 mt-10'>
          <Avatar name={user?.name as string} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
