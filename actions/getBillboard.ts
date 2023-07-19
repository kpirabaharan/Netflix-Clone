import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

const getBillboard = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return randomMovie[0];
  } catch (err: any) {
    console.log(err);
    return null;
  }
};

export default getBillboard;
