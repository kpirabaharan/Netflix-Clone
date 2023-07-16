import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    favorites: data?.favoriteMovies,
    favoriteCount: data?.count,
    error,
    isLoading,
    mutate,
  };
};

export default useFavorites;
