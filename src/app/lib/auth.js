import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '../lib/utils';
import { Users } from '../lib/models';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        connectToDatabase()
        console.log("first")
        const user = await Users.findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {   
          return {
            id: user._id,
            name: user.username,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
