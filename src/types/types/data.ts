export interface IGenre {
  id: string;
  name: string;
  active: boolean;
}

export interface IBook {
  id: number;
  name: string;
  author: string;
  genre: string;
}
