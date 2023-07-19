import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

const getFavoriteMovies = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const favoriteMovies = await prisma.movie.findMany({
      where: { id: { in: currentUser?.favoriteIds } },
    });

    const count = await prisma.movie.count({
      where: { id: { in: currentUser?.favoriteIds } },
    });

    return { favoriteMovies, count };
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export default getFavoriteMovies;
