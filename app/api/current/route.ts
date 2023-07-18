import { NextResponse } from 'next/server';

import serverAuth from '@/lib/serverAuth';

export const GET = async (req: Request) => {
  try {
    const { currentUser: user } = await serverAuth();

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log((err as Error).message);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
