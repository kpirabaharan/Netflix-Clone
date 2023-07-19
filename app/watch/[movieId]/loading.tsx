'use client';

import { PropagateLoader } from 'react-spinners';

import Box from '@/components/Box';

const Loading = () => {
  return (
    <Box className='flex h-full items-center justify-center'>
      <PropagateLoader color='#ff0000' size={30} />
    </Box>
  );
};

export default Loading;
