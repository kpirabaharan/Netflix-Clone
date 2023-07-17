'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Movie } from '@/types';

import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  title: string;
  count: number;
  rowSize: number;
}

const MovieList = ({ title, movies, count, rowSize }: MovieListProps) => {
  const [numberOfRows, setNumberOfRows] = useState(1);
  const [row, setRow] = useState(0);

  const [initial, setInitial] = useState<{ x: string }>({ x: '630%' });
  const [animate, setAnimate] = useState<{ x: number }>({ x: 0 });
  const [exit, setExit] = useState<{ x: string }>({ x: '-630%' });

  const [rightSize, setRightSize] = useState<{ x: string }>({ x: '630%' });
  const [leftSize, setLeftSize] = useState<{ x: string }>({ x: '-630%' });

  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    setNumberOfRows(Math.ceil(count / rowSize));
    if (row === numberOfRows) {
      setRow(numberOfRows - 1);
    }
    setRightSize({ x: `${rowSize * 100 + 30}%` });
    setLeftSize({ x: `${-rowSize * 100 - 30}%` });
  }, [count, rowSize, numberOfRows, row]);

  const incrementRow = () => {
    setRow((val) => val + 1);
  };

  const decrementRow = () => {
    setRow((val) => val - 1);
  };

  const nextTransition = useCallback(() => {
    setInitial(rightSize);
    setAnimate({ x: 0 });
    setExit(leftSize);
  }, [rightSize, leftSize]);

  const previousTransition = useCallback(() => {
    setInitial(leftSize);
    setAnimate({ x: 0 });
    setExit(rightSize);
  }, [leftSize, rightSize]);

  const isDisabledLeft = row === 0;
  const isDisabledRight = row === numberOfRows - 1;

  const disableLeftButton = isDisabledLeft ? 'text-gray-700' : 'text-white';
  const disableRightButton = isDisabledRight ? 'text-gray-700' : 'text-white';

  const displayedMovies = useMemo(() => {
    return movies?.slice(
      row * rowSize,
      Math.min(row * rowSize + rowSize, count),
    );
  }, [count, movies, row, rowSize]);

  if (isEmpty(movies)) {
    return null;
  }

  return (
    <div className='mt-4 px-4 sm:px-12 '>
      <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
        {title}
      </p>

      <div className='w-full relative'>
        <div
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 
            gap-2 grid-rows-1 h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw]'
        >
          <AnimatePresence>
            {displayedMovies.map((movie) => {
              // console.log(movie.title);
              return (
                <motion.div
                  className='hover:z-20'
                  key={movie.id}
                  initial={isAnimate ? initial : false}
                  animate={animate}
                  exit={exit}
                  transition={
                    isAnimate
                      ? {
                          duration: 1,
                        }
                      : { duration: 0.01 }
                  }
                >
                  <MovieCard movie={movie} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Left Arrow */}
        <div
          onClick={!isDisabledLeft ? () => decrementRow() : () => {}}
          onMouseEnter={() => previousTransition()}
          onMouseOver={() => setIsAnimate(true)}
          onMouseLeave={() => setIsAnimate(false)}
          className='h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw] w-12 
          flex justify-center items-center group/item cursor-pointer top-0 z-20
          hover:bg-black/20 transition duration-300 absolute -left-4 sm:-left-12'
        >
          <FaChevronLeft
            size={40}
            className={`opacity-0 group-hover/item:opacity-100
            transition duration shadow-lg ${disableLeftButton}`}
          />
        </div>

        {/* Right Arrow */}
        <div
          onClick={!isDisabledRight ? () => incrementRow() : () => {}}
          onMouseEnter={() => nextTransition()}
          onMouseOver={() => setIsAnimate(true)}
          onMouseLeave={() => setIsAnimate(false)}
          className='h-[25vw] md:h-[18vw] lg:h-[13vw] 2xl:h-[9vw] w-12  
          flex justify-center items-center group/item cursor-pointer top-0 z-20
          hover:bg-black/20 transition duration-300 absolute -right-4 sm:-right-12'
        >
          <FaChevronRight
            size={40}
            className={`opacity-0 group-hover/item:opacity-100
            transition duration shadow-lg ${disableRightButton}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieList;
