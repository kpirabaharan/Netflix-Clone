'use client';

import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams, useRouter } from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { Movie } from '@/types';
import useMousePosition from '@/hooks/useMousePosition';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const { movieId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const router = useRouter();
  const mouseMoving = useMousePosition();

  const { movie }: { movie: Movie } = useMovie(movieId);

  useEffect(() => {
    setIsPlaying(true);

    return () => {
      setIsPlaying(false);
    };
  }, []);

  if (!movie) {
    return null;
  }

  return (
    <div className='h-screen w-screen bg-black group'>
      <nav
        className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 
        bg-black bg-opacity-70 transition duration-300 ease-in hover:opacity-100
        ${
          isPlaying
            ? mouseMoving
              ? 'opacity-100'
              : 'opacity-0'
            : 'opacity-100'
        }`}
      >
        <AiOutlineArrowLeft
          className='text-white cursor-pointer'
          size={40}
          onClick={() => router.push('/')}
        />
        <p className='text-white text-xl md:text-3xl font-bold'>
          <span className='font-light'>Watching: </span>
          {movie.title}
        </p>
      </nav>
      <ReactPlayer
        className='react-player'
        ref={playerRef}
        url={movie.videoUrl}
        height={'100%'}
        width={'100%'}
        playing={isPlaying}
        controls={true}
        onPause={() => setIsPlaying(false)}
        onPlay={() => {
          setIsPlaying(true);
        }}
      />
    </div>
  );
};

export default Watch;
