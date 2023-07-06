import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/prismadb';
import { authOptions } from '@/lib/auth';

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({
        message: 'You are not signed in.',
        status: 401,
      });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({
        message: 'You are not signed in.',
        status: 401,
      });
    }

    return NextResponse.json({
      user: currentUser,
      status: 200,
    });
  } catch (err) {
    console.log((err as Error).message);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
