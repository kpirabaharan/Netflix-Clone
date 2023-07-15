'use client';

import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

import useMediaQuery from '@/hooks/useMediaQuery';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const isMediumScreens = useMediaQuery('(max-width: 1023px)');

  const { mutate: mutateFavorites } = useFavorites();
  const { user: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    if (response.status === 200) {
      if (!isFavorite) toast.success('Added to Favorites', { id: 'Favorite' });
      const updatedFavoriteIds = response?.data?.favoriteIds;

      mutate({
        ...currentUser,
        favoriteIds: updatedFavoriteIds,
      });

      mutateFavorites();
    }
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className='cursor-pointer group/item w-8 h-8 rounded-full 
      border-2 flex justify-center items-center transition duration border-white 
      bg-transparent hover:bg-white'
      onClick={toggleFavorite}
    >
      <Icon
        className='group-hover/item:text-black transition duration text-white'
        size={isMediumScreens ? 20 : 25}
      />
    </div>
  );
};

export default FavoriteButton;
