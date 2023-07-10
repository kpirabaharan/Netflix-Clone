'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';



import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';

const HomePage = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth');
    },
  });

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Tending Now' />
      </div>
    </div>
  );
};

export default HomePage;
