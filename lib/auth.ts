import { NextResponse } from 'next/server';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';

import prisma from '@/lib/prismadb';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            // throw NextResponse.json({
            //   message: 'Email and password required',
            //   status: 401,
            // });
            return null;
            throw Error('Email and password required');
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.hashedPassword) {
            // throw NextResponse.json({
            //   message: 'Email does not exist',
            //   status: 401,
            // });
            throw Error('Email does not exist');
          }

          const isCorrectPassword = await compare(
            credentials.password,
            user.hashedPassword,
          );

          if (!isCorrectPassword) {
            // throw NextResponse.json({
            //   message: 'Incorrect password',
            //   status: 401,
            // });
            return null;
            throw Error('Incorrect password');
          }

          return user;
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
