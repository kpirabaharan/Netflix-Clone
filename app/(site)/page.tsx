'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Movie } from '@/types';
import useMovieList from '@/hooks/useMovieList';
import useMediaQuery from '@/hooks/useMediaQuery';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useFavorites from '@/hooks/useFavorites';

const HomePage = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth');
    },
  });

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

  const { movies, count }: { movies: Movie[]; count: number } = useMovieList();
  const {
    favorites,
    favoriteCount,
  }: { favorites: Movie[]; favoriteCount: number } = useFavorites();

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className='pb-40 flex flex-col gap-y-12 shadow-inner-upper-2xl pt-4'>
        <MovieList
          title='Trending Now'
          movies={movies}
          count={count}
          rowSize={numberOfMovies}
        />

        <MovieList
          title='My List'
          movies={favorites}
          count={favoriteCount}
          rowSize={numberOfMovies}
        />
      </div>
    </div>
  );
};

export default HomePage;
