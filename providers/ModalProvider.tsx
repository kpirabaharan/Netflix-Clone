'use client';

import { useEffect, useState } from 'react';

import useInfoModal from '@/hooks/useInfoModal';

import InfoModal from '@/components/Modals/InfoModal';
import MobileMenuModal from '@/components/Modals/MobileMenuModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose } = useInfoModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={onClose} />
      <MobileMenuModal />
    </>
  );
};

export default ModalProvider;
