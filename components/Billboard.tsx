'use client';

import { AiOutlineInfoCircle } from 'react-icons/ai';

import useMediaQuery from '@/hooks/useMediaQuery';
import useBillboard from '@/hooks/useBillboard';

import { Movie } from '@/types';

import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';

const Billboard = () => {
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');

  const { onOpen } = useInfoModal();

  const { movie }: { movie: Movie } = useBillboard();

  if (!movie) {
    return null;
  }

  return (
    <div className='group relative h-[56.25vw] max-h-[80vh]'>
      <video
        className='w-full h-[56.25vw] object-cover transition duration-500
        brightness-75 max-h-[80vh]'
        autoPlay
        muted
        loop
        poster={movie.thumbnailUrl}
        src={movie.videoUrl}
      ></video>
      <div className='absolute top-[30%] md:top-[35%] lg:top-[40%] xl:top-[50%] ml-4 md:ml-16'>
        <p
          className='text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl 
          font-bold drop-shadow-xl transition duration-500 '
        >
          {movie.title}
        </p>
        <p
          className='text-white text-[8px] md:text-base mt-3 md:mt-8 w-[90%]
          md:w-[80%] lg:w-[50%] drop-shadow-xl transition duration-500'
        >
          {movie.description}
        </p>
        <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
          <PlayButton movieId={movie.id} />
          <button
            onClick={() => onOpen(movie.id)}
            className='bg-white text-white bg-opacity-30 rounded-md 
            py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold 
            flex flex-row items-center justify-center hover:bg-opacity-20 
            transition lg:w-[150px]'
          >
            <AiOutlineInfoCircle
              className='mr-1'
              size={isMediumScreens ? 20 : 25}
            />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
