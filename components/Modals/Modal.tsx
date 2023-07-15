import { PropsWithChildren } from 'react';
import { Root, Portal, Overlay, Content, Close } from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  isCloseButton?: boolean;
}

const Modal = ({
  isOpen,
  onChange,
  isCloseButton = true,
  children,
}: ModalProps) => {
  return (
    <Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Portal>
        <Overlay className='bg-neutral-900/90 backdrop-blur-sm fixed inset-0 z-30' />
        <Content
          className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
          w-[90%] md:w-[80%] mx-auto max-w-3xl bg-zinc-900 z-40'
        >
          <div>{children}</div>
          {isCloseButton ? (
            <Close asChild>
              <button
                className='absolute top-3 right-3 inline-flex h-10 w-10 rounded-full
              bg-black appearance-none items-center justify-center focus:outline-none
              border hover:border-opacity-70 border-white transition duration
              group/item'
                onClick={() => {}}
              >
                <IoMdClose
                  size={25}
                  className='text-white transition duration group-hover/item:text-opacity-70'
                />
              </button>
            </Close>
          ) : (
            <></>
          )}
        </Content>
      </Portal>
    </Root>
  );
};

export default Modal;
