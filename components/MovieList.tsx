'use client';

import { isEmpty } from 'lodash';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Movie } from '@/types';

import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  title: string;
}

const MovieList = ({ title, movies }: MovieListProps) => {
  if (isEmpty(movies)) {
    return null;
  }

  return (
    <div className='mt-4 px-4 sm:px-12 '>
      <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
        {title}
      </p>

      <div className='w-full relative'>
        <div
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 
          gap-2'
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Left Arrow */}
        <div
          className='h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw] w-12 
          flex justify-center items-center group/item cursor-pointer
          hover:bg-black/20 transition duration-300 absolute -left-12 top-0 z-20'
        >
          <FaChevronLeft
            size={40}
            className='text-white opacity-0 group-hover/item:opacity-100
            transition duration shadow-lg'
          />
        </div>

        {/* Right Arrow */}
        <div
          className='h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw] w-12  
          flex justify-center items-center group/item cursor-pointer
          hover:bg-black/20 transition duration-300 absolute -right-12 top-0 z-20'
        >
          <FaChevronRight
            size={40}
            className='text-white opacity-0 group-hover/item:opacity-100
            transition duration shadow-lg'
          />
        </div>
      </div>
    </div>
  );
};

export default MovieList;
