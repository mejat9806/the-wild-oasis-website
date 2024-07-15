import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    }, //this only triger if we go to the page that is in the matcher //the auth is the current session
  },
  pages: {
    signIn: "/login", //this the page that it will redirect to not the basic google one
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
//next step is to create a api folder/auth/[...nextauth]
// [...nextauth] will to enable the HTTP methods

//auth can be called on server components to get like a session
// we can use multiple providers like crediantial for password and email
