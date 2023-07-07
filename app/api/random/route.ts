import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export const GET = async (req: Request) => {
  try {
    await serverAuth();

    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json({ randomMovie: randomMovies[0], status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
