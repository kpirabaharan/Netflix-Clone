'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Movie } from '@/types';
import useInfoModal from '@/hooks/useInfoModal';

import FavoriteButton from '@/components/Buttons/FavoriteButton';
import PlayIcon from '@/components/IconButtons/PlayIcon';
import MoreIcon from '@/components/IconButtons/MoreIcon';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { onOpen } = useInfoModal();

  const animate = isHovered ? 'open' : 'closed';

  const variants = {
    open: { opacity: 1, y: 0, scale: 1 },
    closed: { opacity: 0, y: '100%', scale: 1 },
  };

  const transition = {
    duration: 0.25,
    delay: 0.1,
  };

  return (
    <div
      onClick={() => onOpen(movie.id)}
      className='group col-span relative h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw] 
      sm:hover:scale-[115%] sm:hover:translate-x-6 transition duration-300 cursor-pointer
      hover:z-20'
    >
      <Image
        className='object-cover transition duration shadow-xl rounded-md w-full h-full'
        src={movie.thumbnailUrl}
        alt='Thumbnail'
        fill
        sizes='100vw'
      />

      {/* Hover Div */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='hidden sm:flex flex-col justify-end px-2 pb-2 h-full w-full
        absolute top-0 left-0 rounded-md'
      >
        <motion.div
          initial='closed'
          animate={animate}
          variants={variants}
          transition={transition}
          className='flex flex-row items-center justify-start gap-x-2 lg:gap-3'
        >
          <PlayIcon movieId={movie.id} />
          <FavoriteButton movieId={movie.id} />
          <MoreIcon movieId={movie.id} onOpen={onOpen} />
        </motion.div>
        <motion.p
          initial='closed'
          animate={animate}
          variants={variants}
          transition={transition}
          className='text-white text-lg font-bold truncate'
        >
          {movie.title}
        </motion.p>
        <motion.p
          initial='closed'
          animate={animate}
          variants={variants}
          transition={transition}
          className='text-white text-xs font-semibold truncate'
        >
          {movie.genre}
        </motion.p>
      </div>
    </div>
  );
};

export default MovieCard;
