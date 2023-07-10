import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { Movie } from '@/types';
import getMovies from '@/actions/getMovies';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';

const HomePage = async () => {
  let movies: Movie[] | undefined;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  movies = await getMovies();
  console.log(movies);

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Tending Now' movies={movies} />
      </div>
    </div>
  );
};

export default HomePage;
