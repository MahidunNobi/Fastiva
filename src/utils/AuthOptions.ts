
import connectDB from "@/lib/connectDB";
import User from "@/models/UserModels";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
    },
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "jsmit@h.us" },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
        },
        async authorize(credentials) {
          const { email, password } = credentials || {};
          if (!email || !password) {
            return null;
          }
          await connectDB();
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("User not found");
          } 
          const passwordMatch = bcrypt.compareSync(
            password,
            user?.password || ""
          );        
          if (passwordMatch) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,            
              imageUrl: user.imageUrl,
            };
          }
          throw new Error("Invalid credentials!");
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),    
    ],
    
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider === "google") {
          const { email, name, image } = user;
          await connectDB();
          let userExists = await User.findOne({ email });
          if (!userExists) {
            const newUser = new User({
              email,
              name,
              imageUrl: image,
              provider: account.provider,            
            });
            userExists = await newUser.save();
          }        
          return true;
        }
        return true;
      },
      async redirect({ baseUrl }) {
        return baseUrl;
      },
      async jwt({ token }) {
        // console.log(" TOKEN", token)
        // await connectDB();
        // const dbUser = await User.findOne({ email: token.email });
        // token.name = dbUser?.name;      
        // token.provider = dbUser?.provider;
        // token.suspended = dbUser?.suspended;
        return token;
      },
      async session({ session }) {      
        // console.log("THis is Session:", session);
        // session.user?.name = token.name;      
        // session.user?.provider = token.provider;
        // session.user.suspended = token.suspended;
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",      
    },
  };