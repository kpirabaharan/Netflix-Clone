'use client';

import { toast } from 'react-hot-toast';

import { Movie } from '@/types';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';

import Modal from './Modal';
import PlayButton from './Buttons/PlayButton';
import FavoriteButton from './Buttons/FavoriteButton';

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
    <Modal isOpen={isOpen} onChange={onChange}>
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
      <div className='p-8'>
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
    </Modal>
  );
};

export default InfoModal;
