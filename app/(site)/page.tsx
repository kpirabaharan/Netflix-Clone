'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Movie } from '@/types';
import useMovieList from '@/hooks/useMovieList';

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

  const { movies }: { movies: Movie[] } = useMovieList();
  const { favorites }: { favorites: Movie[] } = useFavorites();

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' movies={movies} />
        <MovieList title='My List' movies={favorites} />
      </div>
    </div>
  );
};

export default HomePage;
