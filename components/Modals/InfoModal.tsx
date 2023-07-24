'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Root, Portal, Overlay, Content, Close } from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';

import { Movie } from '@/types';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';

import PlayButton from '@/components/Buttons/PlayButton';
import FavoriteButton from '@/components/Buttons/FavoriteButton';

const InfoModal = () => {
  const { isOpen, onClose, movieId } = useInfoModal();
  const [isShown, setIsShown] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const { movie }: { movie: Movie } = useMovie(movieId);

  const onChange = (open: boolean) => {
    if (!open) {
      setIsShown(false);
      setTimeout(() => {
        onClose();
      }, 600);
    }
  };

  useEffect(() => {
    if (isOpen) setIsShown(true);
  }, [isOpen]);

  if (!movie) {
    return null;
  }

  return (
    <Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Portal>
        <Overlay className='bg-neutral-900/90 fixed inset-0 z-30' />
        <Content>
          <div
            className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
            mx-auto w-[90%] md:w-[80%] max-w-3xl z-50'
          >
            <AnimatePresence>
              {isShown && (
                <motion.div
                  key='modal'
                  className='h-full w-full'
                  initial={{ y: '150%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '150%', opacity: 0 }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <div className='relative h-96'>
                    <video
                      className='w-full brightness-[70%] object-cover h-full'
                      src={movie.videoUrl}
                      poster={movie.thumbnailUrl}
                      autoPlay
                      loop
                      muted={isMuted}
                    />
                    <div className='absolute bottom-[10%] left-[5%] w-[90%]'>
                      <div className='flex flex-row gap-4 justify-between w-full items-center'>
                        <div className='flex flex-row items-center gap-x-4'>
                          <PlayButton movieId={movie.id} />
                          <FavoriteButton movieId={movie.id} />
                        </div>
                        {isMuted ? (
                          <BiVolumeMute
                            className='text-white cursor-pointer'
                            size={30}
                            onClick={() => setIsMuted(false)}
                          />
                        ) : (
                          <BiVolumeFull
                            className='text-white cursor-pointer'
                            size={30}
                            onClick={() => setIsMuted(true)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='p-8 bg-zinc-900'>
                    <motion.p
                      className='text-white text-2xl md:text-3xl lg:text-4xl h-full 
                  font-bold mb-2'
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.2,
                      }}
                    >
                      {movie.title}
                    </motion.p>
                    <motion.p
                      className='text-white'
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.3,
                      }}
                    >
                      {movie.description}
                    </motion.p>
                    <hr className='bg-neutral-200 border-0 h-px my-4' />
                    <motion.p
                      className='text-white text-lg pb-4'
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.4,
                      }}
                    >
                      Info on
                      <span className='font-bold'> {movie.title}</span>
                    </motion.p>
                    <div className='flex flex-col gap-y-1'>
                      <motion.p
                        className='text-neutral-500 text-sm'
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.5,
                        }}
                      >
                        Genre:
                        <span className='text-white'> {movie.genre}</span>
                      </motion.p>
                      <motion.p
                        className='text-neutral-500 text-sm'
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.6,
                        }}
                      >
                        Duration:
                        <span className='text-white'> {movie.duration}</span>
                      </motion.p>
                    </div>
                  </div>

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
                        className='text-white transition duration 
                    group-hover/item:text-opacity-70'
                      />
                    </button>
                  </Close>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Content>
      </Portal>
    </Root>
  );
};

export default InfoModal;
