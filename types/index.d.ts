export interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

export interface User {
  id: string;
  name: string;
  image: string;
  email: string;
  favoriteIds: string[];
}
