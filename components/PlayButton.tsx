'use client';

import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

import useMediaQuery from '@/hooks/useMediaQuery';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton = ({ movieId }: PlayButtonProps) => {
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');
  const router = useRouter();

  return (
    <button
      className='bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4 
      w-auto text-xs lg:text-lg font-semibold flex flex-row items-center 
      justify-center hover:bg-opacity-70 transition lg:w-[150px]'
      onClick={() => router.push(`/watch/${movieId}`)}
    >
      <BsFillPlayFill
        className='mr-1'
        size={isMediumScreens ? 20 : 30}
      />
      Play
    </button>
  );
};

export default PlayButton;
