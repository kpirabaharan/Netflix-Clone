import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

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
