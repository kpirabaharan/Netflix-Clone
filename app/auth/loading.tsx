'use client';

import { ClockLoader } from 'react-spinners';

import Box from '@/components/Box';

const Loading = () => {
  return (
    <Box className='flex h-full items-center justify-center'>
      <ClockLoader color='#ff0000' size={40} />
    </Box>
  );
};

export default Loading;
