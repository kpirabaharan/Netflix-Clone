import { redirect } from 'next/navigation';

import { User, Movie } from '@/types';
import getCurrentUser from '@/actions/getCurrentUser';
import getMovies from '@/actions/getMovies';
import getFavoriteMovies from '@/actions/getFavoriteMovies';
import getBillboard from '@/actions/getBillboard';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import PageContent from '@/app/(site)/components/PageContent';

export const revalidate = 0;

const HomePage = async () => {
  const user = (await getCurrentUser()) as User;

  if (!user) {
    return redirect('/auth');
  }

  const response = await getMovies();
  const movies = response?.movies as Movie[];
  const count = response?.count as number;

  const responseFavorite = await getFavoriteMovies();
  const favoriteMovies = responseFavorite?.favoriteMovies as Movie[];
  const favoriteCount = response?.count as number;

  const randomMovie = (await getBillboard()) as Movie;

  return (
    <div>
      <Navbar />
      <Billboard movie={randomMovie} />
      <PageContent
        movies={movies}
        count={count}
        favoriteMovies={favoriteMovies}
        favoriteCount={favoriteCount}
      />
    </div>
  );
};

export default HomePage;
