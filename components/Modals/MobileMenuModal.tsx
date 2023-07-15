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
      <div></div>
    </Modal>
  );
};

export default MobileMenuModal;
