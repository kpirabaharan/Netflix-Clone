import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

const getMovies = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const movies = await prisma.movie.findMany();
    const count = await prisma.movie.count();

    return { movies, count };
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export default getMovies;
