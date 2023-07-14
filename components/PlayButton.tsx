'use client';

import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

import useMediaQuery from '@/hooks/useMediaQuery';
import useInfoModal from '@/hooks/useInfoModal';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton = ({ movieId }: PlayButtonProps) => {
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');
  const router = useRouter();

  const { onClose } = useInfoModal();

  return (
    <button
      className='bg-[#e50914] text-white rounded-md py-2 px-8 
      text-xs lg:text-lg font-semibold flex flex-row items-center 
      justify-center hover:bg-opacity-80 transition duration lg:w-[150px]'
      onClick={() => {
        onClose();
        router.push(`/watch/${movieId}`);
      }}
    >
      <BsFillPlayFill className='mr-1' size={isMediumScreens ? 20 : 30} />
      Play
    </button>
  );
};

export default PlayButton;
