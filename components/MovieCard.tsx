/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';

import { Movie } from '@/types';
import useInfoModal from '@/hooks/useInfoModal';
import { slideIn, fadeIn } from '@/utils';

import FavoriteButton from './Buttons/FavoriteButton';
import PlayIcon from './IconButtons/PlayIcon';
import MoreIcon from './IconButtons/MoreIcon';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { onOpen } = useInfoModal();

  return (
    <div
      className='group bg-zinc-900 col-span relative h-[24vw] sm:h-[18vw] 
      lg:h-[13vw] xl:h-[9vw] hover:scale-125 hover:z-50 transition duration-300'
    >
      <img
        className='object-cover transition duration shadow-xl rounded-md 
        group-hover:opacity-90 delay-300 w-full cursor-pointer h-full'
        src={movie.thumbnailUrl}
        alt='Thumbnail'
      />

      <motion.div
        variants={slideIn('up', 'tween', 0.5, 2)}
        className='absolute top-0 left-0 h-full w-full bg-gray-600/30 rounded-md
          opacity-0 hover:opacity-100 transition duration-300'
      >
        <div className='flex flex-col justify-end px-2 pb-2 h-full w-full'>
          <div className='flex flex-row items-center justify-start gap-x-2 lg:gap-3'>
            <PlayIcon movieId={movie.id} />
            <FavoriteButton movieId={movie.id} />
            <MoreIcon movieId={movie.id} onOpen={onOpen} />
          </div>
          <p className='text-white text-lg font-bold truncate'>{movie.title}</p>
          <p className='text-white text-xs font-semibold truncate'>
            {movie.genre}
          </p>
        </div>
      </motion.div>

      {/* <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
        
        <p className='text-green-400 font-semibold mt-4'>
          New <span className='text-white'>2023</span>
        </p>

        <div className='flex flex-row mt-4 gap-2 items-center'>
          <p className='text-white text-[10px] lg:text-sm'>{movie.duration}</p>
        </div>

        <div className='flex flex-row mt-4 gap-2 items-center'>
          <p className='text-white text-[10px] lg:text-sm'>{movie.genre}</p>
        </div>
      </div> */}
    </div>
  );
};

export default MovieCard;
