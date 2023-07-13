'use client';

import { useEffect, useState } from 'react';

import InfoModal from '@/components/InfoModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <InfoModal />
    </>
  );
};

export default ModalProvider;
