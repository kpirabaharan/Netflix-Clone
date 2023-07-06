import Image from 'next/image';

import AuthContent from '@/app/auth/components/AuthContent';

const AuthPage = () => {
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
        <AuthContent />
      </div>
    </div>
  );
};

export default AuthPage;
