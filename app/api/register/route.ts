import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prismadb';

export const POST = async (req: Request) => {
  try {
    const { email, name, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json('Email taken', { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({ user });
  } catch (err: any) {
    console.log((err as Error).message);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
