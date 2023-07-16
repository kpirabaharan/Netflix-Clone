import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export const GET = async (req: Request) => {
  try {
    await serverAuth();

    const movies = await prisma.movie.findMany();
    const count = await prisma.movie.count();

    return NextResponse.json({ movies, count, status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
