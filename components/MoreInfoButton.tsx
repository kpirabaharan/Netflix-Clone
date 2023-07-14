'use client';

import { AiOutlineInfoCircle } from 'react-icons/ai';

import useMediaQuery from '@/hooks/useMediaQuery';

interface MoreInfoButtonProps {
  movieId: string;
  onOpen: (id: string) => void;
}

const MoreInfoButton = ({ movieId, onOpen }: MoreInfoButtonProps) => {
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');

  return (
    <button
      onClick={() => onOpen(movieId)}
      className='bg-white text-white bg-opacity-30 rounded-md 
      py-2 px-4 text-xs lg:text-lg font-semibold flex flex-row items-center 
      justify-center hover:bg-opacity-20 transition lg:w-[150px]'
    >
      <AiOutlineInfoCircle className='mr-1' size={isMediumScreens ? 20 : 25} />
      More Info
    </button>
  );
};

export default MoreInfoButton;
