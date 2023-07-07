'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AvatarProps {
  name: string;
}

const Avatar = ({ name }: AvatarProps) => {
  const router = useRouter();
  return (
    <div
      className='group flex flex-col w-44 mx-auto'
      onClick={() => router.push('/')}
    >
      <div
        className='h-44 w-44 rounded-md flex items-center 
                justify-center border-2 border-transparent group-hover:cursor-pointer 
                group-hover:border-white overflow-hidden'
      >
        <Image
          src={'/images/avatar-blue.png'}
          alt='Profile'
          height={500}
          width={500}
        />
      </div>
      <div
        className='mt-4 text-gray-400 text-2xl text-center 
                group-hover:text-white cursor-pointer'
      >
        {name}
      </div>
    </div>
  );
};

export default Avatar;
