import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
  }
  interface Session {
    user: User & {
      id: string;
      username: string;
      image: string;
    };
    token: {
      username: string;
    };
  }
}
