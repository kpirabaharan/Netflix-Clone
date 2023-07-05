'use client';

import { useState } from 'react';
import Image from 'next/image';

import Input from '@/components/Input';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div
      className='relative h-full w-full bg-loginBg bg-cover bg-no-repeat bg-center 
      bg-fixed'
    >
      <div className='bg-black w-full h-full md:bg-opacity-50'>
        <nav className='px-6 py-5'>
          <Image
            height={175}
            width={175}
            className='object-cover'
            src='/images/logo.png'
            alt='Logo'
          />
        </nav>
        <div className='flex justify-center'>
          <div
            className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 
            md:w-13/5 md:max-w-md rounded-md w-full'
          >
            <h2 className='text-white text-3xl mb-8 font-semibold'>Sign In</h2>
            <div className='flex flex-col gap-y-4'>
              <Input
                id='name'
                value={name}
                label='Username'
                onChange={(event: any) => setName(event.target.value)}
              />
              <Input
                id='email'
                type='email'
                value={email}
                label='Email'
                onChange={(event: any) => setEmail(event.target.value)}
              />
              <Input
                id='password'
                type='password'
                value={password}
                label='Password'
                onChange={(event: any) => setPassword(event.target.value)}
              />
            </div>
            <button
              className='bg-red-700 py-3 text-white rounded-md w-full mt-10 
            hover:bg-red-700 transition'
            >
              {' '}
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
