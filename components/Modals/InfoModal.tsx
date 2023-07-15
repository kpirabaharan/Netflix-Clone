'use client';

import { Root, Portal, Overlay, Content, Close } from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

import { Movie } from '@/types';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';

import PlayButton from '../Buttons/PlayButton';
import FavoriteButton from '../Buttons/FavoriteButton';

const InfoModal = () => {
  const { isOpen, onClose, movieId } = useInfoModal();

  const { movie }: { movie: Movie } = useMovie(movieId);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!movie) {
    return null;
  }

  return (
    <Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Portal>
        <Overlay className='bg-neutral-900/90 backdrop-blur-sm fixed inset-0 z-30' />
        <Content
          className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
          w-[90%] md:w-[80%] mx-auto max-w-3xl z-40'
        >
          <div className='relative h-96'>
            <video
              className='w-full brightness-[70%] object-cover h-full'
              src={movie.videoUrl}
              poster={movie.thumbnailUrl}
              autoPlay
              loop
              muted
            />
            <div className='absolute bottom-[10%] left-10'>
              <div className='flex flex-row gap-4 items-center'>
                <PlayButton movieId={movie.id} />
                <FavoriteButton movieId={movie.id} />
              </div>
            </div>
          </div>
          <div className='p-8 bg-zinc-900'>
            <p className='text-white text-2xl md:text-3xl lg:text-4xl h-full font-bold mb-2'>
              {movie.title}
            </p>
            <p className='text-white'>{movie.description}</p>
            <hr className='bg-neutral-200 border-0 h-px my-4' />
            <p className='text-white text-lg pb-4'>
              Info on
              <span className='font-bold'> {movie.title}</span>
            </p>
            <div className='flex flex-col gap-y-1'>
              <p className='text-neutral-500 text-sm'>
                Genre:
                <span className='text-white'> {movie.genre}</span>
              </p>
              <p className='text-neutral-500 text-sm'>
                Duration:
                <span className='text-white'> {movie.duration}</span>
              </p>
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
                className='text-white transition duration group-hover/item:text-opacity-70'
              />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  );
};

export default InfoModal;
