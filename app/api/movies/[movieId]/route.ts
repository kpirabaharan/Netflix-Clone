import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

interface RouteProps {
  params: { movieId: string };
}

export const GET = async (req: Request, { params }: RouteProps) => {
  try {
    await serverAuth();

    const movieId = params.movieId;

    if (!movieId) {
      throw new Error('Invalid ID');
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    return NextResponse.json(movie, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
