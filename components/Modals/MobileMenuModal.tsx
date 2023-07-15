'use client';

import useMobileMenuModal from '@/hooks/useMobileMenuModal';

import Modal from './Modal';

const MobileMenuModal = () => {
  const { isOpen, onClose } = useMobileMenuModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onChange={onChange} isCloseButton={false}>
      <div className='w-full h-full flex flex-col gap-y-16 justify-center'>
        <p className='text-white text-2xl'>Home</p>
      </div>
    </Modal>
  );
};

export default MobileMenuModal;
