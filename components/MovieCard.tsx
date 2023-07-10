/* eslint-disable @next/next/no-img-element */
'use client';

import { BsFillPlayFill } from 'react-icons/bs';

import { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className='group bg-zinc-900 col-span relative h-[12vw]'>
      <img
        className='object-cover transition duration shadow-xl rounded-md 
        group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 h-[12vw] w-full
        cursor-pointer'
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
          rounded-t-md w-full h-[12vw]'
          src={movie.thumbnailUrl}
          alt='Thumbnail'
        />
        <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
          <div className='flex flex-row items-center gap-3'>
            <div
              onClick={() => {}}
              className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full
              flex justify-center items-center transition hover:bg-neutral-300'
            >
              <BsFillPlayFill size={30} />
            </div>
          </div>
          <p className='text-green-400 font-semibold mt-4'>
            New <span className='text-white'>2023</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
