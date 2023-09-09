'use client';

import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { BsIncognito } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

import { postData } from '@/lib/helpers';

import Input from '@/components/Input';

const AuthContent = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    );
  }, []);

  const login = async () => {
    setIsLoading(true);
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      });
    } catch (err) {
      console.log((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async () => {
    setIsLoading(true);
    const data = { email, name, password };

    const { status, error } = await postData({
      url: '/api/register',
      data,
    });

    if (status !== 200) {
      if (status === 422) toast.error(error);
    } else {
      toast.success('Successfully Registered');
      login();
    }
    setIsLoading(false);
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
        </div>

        <div className='mt-8'>
          <button
            disabled={isLoading}
            onClick={variant === 'login' ? login : register}
            className={`bg-red-700 py-3 text-white rounded-md w-full h-[46px]
            hover:bg-opacity-80 transition ${
              isLoading ? 'cursor-progress' : 'cursor-pointer'
            } relative`}
          >
            <div className='flex justify-center items-center'>
              {!isLoading ? (
                <p>{variant === 'login' ? 'Sign In' : 'Sign Up'}</p>
              ) : (
                <PulseLoader color='#ffffff' size={10} />
              )}
            </div>
          </button>
        </div>

        {variant === 'login' && (
          <div
            onClick={async () => {
              setIsLoading(true);
              await signIn('credentials', {
                email: 'test@test.com',
                password: 'Password123',
                callbackUrl: '/profiles',
              });
              setIsLoading(false);
            }}
            className={`flex flex-row mt-8 gap-x-4 hover:bg-opacity-80 
              rounded-md py-2 items-center justify-center transition h-[46px] 
              ${isLoading ? 'cursor-progress' : 'cursor-pointer'} relative 
              bg-gradient-to-r from-red-700 via-cyan-900 to-red-700`}
          >
            {!isLoading ? (
              <>
                <BsIncognito size={30} className='text-white' />
                <p className='text-white font-semibold'>
                  Sign in Anonymously (Demo)
                </p>
              </>
            ) : (
              <PulseLoader color='#ffffff' size={10} />
            )}
          </div>
        )}

        {variant === 'login' && (
          <div className='flex flex-col gap-y-4 mt-8'>
            <div
              onClick={async () => {
                setIsLoading(true);
                await signIn('google', { callbackUrl: '/profiles' });
                setIsLoading(false);
              }}
              className={`flex flex-row gap-x-4 bg-neutral-200 hover:bg-opacity-80 
              rounded-md py-2 items-center justify-center transition h-[46px] 
              ${isLoading ? 'cursor-progress' : 'cursor-pointer'} relative`}
            >
              {!isLoading ? (
                <>
                  <FcGoogle size={30} />
                  <p className='font-semibold'>Continue with Google</p>
                </>
              ) : (
                <PulseLoader color='#ff0000' size={10} />
              )}
            </div>
            <div
              onClick={async () => {
                setIsLoading(true);
                await signIn('github', { callbackUrl: '/profiles' });
                setIsLoading(false);
              }}
              className={`flex flex-row gap-x-4 bg-neutral-200 hover:bg-opacity-80 
              rounded-md py-2 items-center justify-center transition h-[46px] 
              ${isLoading ? 'cursor-progress' : 'cursor-pointer'} relative`}
            >
              {!isLoading ? (
                <>
                  <FaGithub size={30} className='text-black' />
                  <p className='font-semibold'>Continue with Github</p>
                </>
              ) : (
                <PulseLoader color='#ff0000' size={10} />
              )}
            </div>
          </div>
        )}

        <p className='text-neutral-500 mt-12 text-base'>
          {variant === 'login' ? 'New to Netflix?' : 'Already have an account?'}
          <span
            onClick={toggleVariant}
            className='text-white ml-1 hover:underline cursor-pointer'
          >
            {variant === 'login' ? 'Sign up now' : 'Login instead'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthContent;
