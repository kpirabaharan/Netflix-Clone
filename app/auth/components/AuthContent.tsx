'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import { postData } from '@/lib/helpers';

import Input from '@/components/Input';

const AuthContent = () => {
  const router = useRouter();
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
    console.log('Signing In');
    try {
      const user = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });

      router.push('/');
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  const register = async () => {
    setIsLoading(true);
    const data = { email, name, password };

    const { user, status, error } = await postData({
      url: '/api/register',
      data,
    });

    if (status !== 200) {
      if (status === 422) toast.error(error);
    } else {
      toast.success('Successfully Registered');
      setVariant('login');
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

        <button
          disabled={isLoading}
          onClick={variant === 'login' ? login : register}
          className='bg-red-700 py-3 text-white rounded-md w-full mt-8 
        hover:bg-opacity-80 transition'
        >
          {variant === 'login' ? 'Sign In' : 'Sign Up'}
        </button>

        <div className='flex flex-col gap-y-4 mt-8'>
          <div
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className='flex flex-row gap-x-4 pl-4 bg-neutral-200 hover:bg-opacity-80 rounded-md py-2 
            items-center cursor-pointer'
          >
            <FcGoogle size={30} />
            <p className='font-semibold'>Continue with Google</p>
          </div>
          <div
            onClick={() => signIn('github', { callbackUrl: '/' })}
            className='flex flex-row gap-x-4 pl-4 bg-neutral-200 hover:bg-opacity-80 rounded-md py-2
            items-center cursor-pointer'
          >
            <FaGithub size={30} />
            <p className='font-semibold'>Continue with Github</p>
          </div>
        </div>

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
