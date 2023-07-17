'use client';

import { Root, Portal, Overlay, Content } from '@radix-ui/react-dialog';

import useMobileMenuModal from '@/hooks/useMobileMenuModal';

const MobileMenuModal = () => {
  const { isOpen, onClose } = useMobileMenuModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Portal>
        <Overlay className='bg-neutral-900/90 backdrop-blur fixed inset-0 z-30' />
        <Content className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-40 border-none'>
          <div
            className='h-full flex flex-col gap-y-16 items-center'
            onClick={() => onChange(false)}
          >
            <p className='text-white text-xl shadow-xl cursor-pointer'>Home</p>
            <p className='text-white text-xl shadow-xl cursor-pointer'>
              TV Series
            </p>
            <p className='text-white text-xl shadow-xl cursor-pointer'>
              Movies
            </p>
            <p className='text-white text-xl shadow-xl cursor-pointer'>
              New & Popular
            </p>
            <p className='text-white text-xl shadow-xl cursor-pointer'>
              My List
            </p>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default MobileMenuModal;
