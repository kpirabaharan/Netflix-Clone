'use client';

import { useState, useCallback } from 'react';

import { postData } from '@/lib/helpers';

import Input from '@/components/Input';
import { error } from 'console';
import { stat } from 'fs';

const AuthContent = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    );
  }, []);

  const register = async () => {
    const data = { email, name, password };

    const { user, status, error } = await postData({
      url: '/api/register',
      data,
    });

    console.log({ user, status, error });

    if (status !== 200) {
      setIsError(true);
      setErrorMessage(error);
    } else {
      setIsError(false);
      setErrorMessage('');
      setVariant('login');
    }
  };

  return (
    <div className='flex justify-center'>
      <div
        className='bg-black/70 px-16 py-16 self-center mt-2 md:w-3/5 
      md:max-w-md rounded-md w-full'
      >
        <h2 className='text-white text-3xl mb-8 font-semibold'>
          {variant === 'login' ? 'Sign In' : 'Register'}
        </h2>
        <div className='flex flex-col gap-y-4'>
          {variant === 'register' && (
            <Input
              id='name'
              value={name}
              label='Username'
              onChange={(event: any) => setName(event.target.value)}
            />
          )}
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
          {isError ? (
            <p className='font-bold text-sm text-red-800'>{errorMessage}</p>
          ) : (
            <></>
          )}
        </div>
        <button
          onClick={register}
          className='bg-red-700 py-3 text-white rounded-md w-full mt-10 
      hover:bg-red-800 transition'
        >
          {variant === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='text-neutral-500 mt-12 text-sm'>
          {variant === 'login'
            ? 'First time using Netflix?'
            : 'Already have an account?'}
          <span
            onClick={toggleVariant}
            className='text-white ml-1 hover:underline cursor-pointer'
          >
            {variant === 'login' ? 'Create an account' : 'Login instead'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthContent;
