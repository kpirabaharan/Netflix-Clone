/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { BsFillPlayFill, BsChevronDown } from 'react-icons/bs';

import { Movie } from '@/types';
import useMediaQuery from '@/hooks/useMediaQuery';

import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');
  const router = useRouter();
  const { onOpen } = useInfoModal();

  return (
    <div className='group bg-zinc-900 col-span relative h-[24vw] sm:h-[18vw] lg:h-[13vw] xl:h-[9vw]'>
      <img
        className='object-cover transition duration shadow-xl rounded-md 
        group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full cursor-pointer
        h-[24vw] sm:h-[18vw] lg:h-[13vw] xl:h-[9vw]'
        src={movie.thumbnailUrl}
        alt='Thumbnail'
      />
      <div
        className='opacity-0 absolute top-0 transition duration-200 z-10 
        invisible sm:visible w-full scale-0 group-hover:scale-110 
        group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] 
        group-hover:opacity-100 '
      >
        <img
          className='cursor-pointer object-hover transition duration shadow-xl 
          rounded-t-md w-full h-[12vw] 2xl:h-[8vw]'
          src={movie.thumbnailUrl}
          alt='Thumbnail'
        />
        <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
          <div className='flex flex-row items-center justify-start gap-2 lg:gap-3'>
            <div
              onClick={() => router.push(`/watch/${movie.id}`)}
              className='cursor-pointer w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full
              flex justify-center items-center transition hover:bg-neutral-300'
            >
              <BsFillPlayFill size={isMediumScreens ? 25 : 30} />
            </div>
            <FavoriteButton movieId={movie.id} />
            <div
              onClick={() => onOpen(movie.id)}
              className='cursor-pointer ml-auto group/item w-8 h-8 lg:w-10 lg:h-10 
              border-2 rounded-full flex justify-center items-center 
              transition hover:border-opacity-70 border-white'
            >
              <BsChevronDown
                size={isMediumScreens ? 20 : 25}
                className='group-hover/item:opacity-70 text-white'
              />
            </div>
          </div>
          <p className='text-green-400 font-semibold mt-4'>
            New <span className='text-white'>2023</span>
          </p>

          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>
              {movie.duration}
            </p>
          </div>

          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>{movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
