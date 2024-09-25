import { Post, User } from "@prisma/client";

export type TDisplayProfile = {
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    image: string;
    bannerImage: string;
    bio: string;
    createdAt: Date;
  };
};
export type UserProps = {
  id: string;
  username: string;
  email: string;
  password: string;
  image: string;
  bannerImage: string;
  bio: string;
  createdAt: Date;
  posts: {
    id: string;
    postBody: string;
    postImage: string[];
    authorImage: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type UserInfo = {
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    image: string;
    bannerImage: string;
    bio: string;
    createdAt: Date;
    posts: {
      id: string;
      postBody: string;
      postImage: string[];
      authorImage: string;
      authorId: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
};

export type Posts = {
  id: string;
  postBody: string;
  postImage: string[];
  authorImage: string;
  authorId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PostVar = {
  postBody?: string;
  imgUrl?: string[];
  vidUrl?: string;
};



export type FeedPostType = Post & { author: User } & {
  likes: [{ userId: string }];
} & {
  _count: {
    comment: number;
  };
};
