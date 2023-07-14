'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import useBillboard from '@/hooks/useBillboard';

import { Movie } from '@/types';
import useInfoModal from '@/hooks/useInfoModal';

import PlayButton from './PlayButton';
import MoreInfoButton from './MoreInfoButton';

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
        className='w-full h-[56.25vw] object-cover brightness-75 max-h-[80vh] '
        autoPlay
        muted
        loop
        poster={movie.thumbnailUrl}
        src={movie.videoUrl}
      ></video>

      {/* Inner Shadow for Video */}
      <div className='absolute w-full h-full top-0 left-0 shadow-inner-upper' />
      <div className='absolute w-full h-full top-0 left-0 shadow-inner-lower' />

      {/* Mobile to Medium Screens */}
      <div
        className='absolute flex flex-col gap-y-2 md:gap-y-4 lg:hidden bottom-[5%] left-0 w-full 
        items-center'
      >
        <p className='text-white text-3xl md:text-5xl font-bold'>
          {movie.title}
        </p>
        <div className='flex flex-row gap-x-2'>
          <PlayButton movieId={movie.id} />
          <MoreInfoButton movieId={movie.id} onOpen={onOpen} />
        </div>
        <div className='flex text-center max-w-[90%] md:max-w-[60%]'>
          <p className='text-white text-sm md:text-lg line-clamp-2 md:line-clamp-3'>
            {movie.description}
          </p>
        </div>
      </div>

      {/* Large and Screens */}
      <div className='absolute hidden lg:inline bottom-[20%] ml-16'>
        <p
          className='text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl 
          font-bold drop-shadow-xl transition duration-500'
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
          <MoreInfoButton movieId={movie.id} onOpen={onOpen} />
        </div>
      </div>
    </div>
  );
};

export default Billboard;
