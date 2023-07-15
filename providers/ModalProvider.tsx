'use client';

import { useEffect, useState } from 'react';

import InfoModal from '@/components/Modals/InfoModal';
import MobileMenuModal from '@/components/Modals/MobileMenuModal';

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
      <MobileMenuModal />
    </>
  );
};

export default ModalProvider;
