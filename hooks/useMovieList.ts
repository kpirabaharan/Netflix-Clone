import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useMovieList = () => {
  const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { movies: data?.movies, error, isLoading };
};

export default useMovieList;
