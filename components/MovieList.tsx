'use client';

import { isEmpty } from 'lodash';

import useMovieList from '@/hooks/useMovieList';
import { Movie } from '@/types';

interface MovieListProps {
  title: string;
}

const MovieList = ({ title }: MovieListProps) => {
  const { data: movies = [] }: { data: Record<string, any> } = useMovieList();

  if (isEmpty(movies)) {
    return null;
  }

  console.log(movies);

  return (
    <div className='px-4 md:px-12 mt-4 space-y-8'>
      <div>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
          {title}
        </p>
        <div className='grid grid-cols-4 gap-2'>
          {Array.isArray(movies)
            ? movies.map((movie: Movie) => <div key={movie.id}>Movie</div>)
            : ''}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
