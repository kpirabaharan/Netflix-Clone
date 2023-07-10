import { Movie } from '@/types';

const getMovies = async (): Promise<Movie[] | undefined> => {
  const response = await fetch(process.env.URL + '/api/movies', {
    method: 'GET',
    next: { revalidate: 600 },
  });

  let responseData: Movie[] | undefined;

  if (response.ok) {
    responseData = await response.json();
  }

  return responseData;
};

export default getMovies;
