'use client';

import useMediaQuery from '@/hooks/useMediaQuery';

import { BsChevronDown } from 'react-icons/bs';

interface MoreIconProps {
  movieId: string;
  onOpen: (id: string) => void;
}

const MoreIcon = ({ movieId, onOpen }: MoreIconProps) => {
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');

  return (
    <div
      onClick={() => onOpen(movieId)}
      className='cursor-pointer group/item w-8 h-8 border-2 rounded-full 
      flex justify-center items-center bg-transparent hover:bg-white transition 
      duration border-white'
    >
      <BsChevronDown
        className='text-white group-hover/item:text-black transition duration'
        size={isMediumScreens ? 20 : 25}
      />
    </div>
  );
};

export default MoreIcon;
