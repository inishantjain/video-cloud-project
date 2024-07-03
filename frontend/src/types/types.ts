export interface VideoProps {
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  _id: string;
}

export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  number: number;
  bio?: string;
  imgUrl?: string;
  videos: VideoProps[];
}
