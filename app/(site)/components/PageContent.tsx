'use client';

import { useState, useEffect } from 'react';

import { Movie } from '@/types';
import useMediaQuery from '@/hooks/useMediaQuery';

import MovieList from '@/components/MovieList';

interface PageContentProps {
  movies: Movie[];
  count: number;
  favoriteMovies: Movie[];
  favoriteCount: number;
}

const PageContent = ({
  movies,
  count,
  favoriteMovies,
  favoriteCount,
}: PageContentProps) => {
  const isSmallScreens = useMediaQuery('(max-width: 767px)');
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');
  const isLargeScreens = useMediaQuery('(max-width: 1535px)');

  const [numberOfMovies, setNumberOfMovies] = useState(6);

  // When MediaQueries Changes
  useEffect(() => {
    if (isSmallScreens) {
      setNumberOfMovies(2);
    } else if (isMediumScreens && !isSmallScreens) {
      setNumberOfMovies(3);
    } else if (isLargeScreens && !isMediumScreens && !isSmallScreens) {
      setNumberOfMovies(4);
    } else {
      setNumberOfMovies(6);
    }
  }, [isLargeScreens, isMediumScreens, isSmallScreens, numberOfMovies]);

  return (
    <div className='pb-40 flex flex-col gap-y-12 shadow-inner-upper-2xl pt-4'>
      <MovieList
        title='Trending Now'
        movies={movies}
        count={count}
        rowSize={numberOfMovies}
      />

      <MovieList
        title='My List'
        movies={favoriteMovies}
        count={favoriteCount}
        rowSize={numberOfMovies}
      />
    </div>
  );
};

export default PageContent;
