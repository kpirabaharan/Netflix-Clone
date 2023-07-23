import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

import { orderBy } from 'lodash';

const getMovies = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const movies = await prisma.movie.findMany();
    const formattedMovies = orderBy(movies, 'createdAt', 'desc');

    const count = await prisma.movie.count();

    return { movies: formattedMovies, count };
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export default getMovies;
