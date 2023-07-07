import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  return (
    <div>
      <Navbar />
      <Billboard />
    </div>
  );
};

export default HomePage;
