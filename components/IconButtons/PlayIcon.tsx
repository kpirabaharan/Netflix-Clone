'use client';

import { useRouter } from 'next/navigation';

import useMediaQuery from '@/hooks/useMediaQuery';

import { BsFillPlayFill } from 'react-icons/bs';

interface PlayIconProps {
  movieId: string;
}

const PlayIcon = ({ movieId }: PlayIconProps) => {
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/watch/${movieId}`)}
      className='cursor-pointer w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full
      flex justify-center items-center transition hover:bg-neutral-300'
    >
      <BsFillPlayFill size={isMediumScreens ? 25 : 30} />
    </div>
  );
};

export default PlayIcon;
