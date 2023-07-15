'use client';

import { isEmpty } from 'lodash';

import { Movie } from '@/types';
import useMovieList from '@/hooks/useMovieList';

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
    <div className='px-4 sm:px-12 mt-4 space-y-8'>
      <div>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
          {title}
        </p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-2'>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
