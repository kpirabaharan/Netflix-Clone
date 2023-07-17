'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { PiSignOutBold } from 'react-icons/pi';
import { AiOutlineUserSwitch } from 'react-icons/ai';

import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu = ({ visible }: AccountMenuProps) => {
  const router = useRouter();
  const { user } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div
      className='flex flex-col absolute top-14 right-0 py-5 bg-black w-56 
      border-2 border-gray-800 rounded-lg'
    >
      <div className='flex flex-col gap-3'>
        <div className='w-full px-3 group/item flex flex-row gap-3 items-center'>
          <Image
            className='w-8 rounded-md'
            src={'/images/avatar-slate.png'}
            alt='Profile'
            height={100}
            width={100}
          />
          <p className='text-white text-sm group-hover/item:underline'>
            {user?.name}
          </p>
        </div>
        <div
          onClick={() => router.push('/profiles')}
          className='flex flex-row justify-center gap-x-2 pt-4 group/item'
        >
          <AiOutlineUserSwitch size={24} className='text-white' />
          <p
            className='text-white text-sm hover:underline leading-6 
            group-hover/item:underline'
          >
            Switch Profiles
          </p>
        </div>
        <hr className='bg-gray-600 border-0 h-px my-4' />
        <div
          onClick={() => signOut()}
          className='flex flex-row justify-center gap-x-2 group/item'
        >
          <PiSignOutBold className='text-white' size={24} />
          <p
            className='text-white text-sm hover:underline leading-6 
            group-hover/item:underline'
          >
            Sign out of Netflix
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
