import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

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

    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email); //this can the same as mongodb check user function

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name }); //this can the same as mongodb check user function
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email); //this will get the user
      session.user.guestId = guest.id; //this will add guset id to the session object
      return session;
    },
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
