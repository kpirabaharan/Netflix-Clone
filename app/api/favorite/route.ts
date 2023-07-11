import { without } from 'lodash';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export const POST = async (req: Request) => {
  try {
    const { currentUser } = await serverAuth();

    const { movieId } = await req.json();

    const existingMovie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }

    const updatedUser = await prisma.user.update({
      where: { email: currentUser.email || '' },
      data: { favoriteIds: { push: movieId } },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { currentUser } = await serverAuth();

    const { movieId } = await req.json();

    const existingMovie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prisma.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: { favoriteIds: updatedFavoriteIds },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
