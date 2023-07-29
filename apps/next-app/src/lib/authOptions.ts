import GitHubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: "X",
      clientSecret: "X",
      profile(profile, tokens) {
          console.log(profile,tokens)
          return profile;
      },
    }),
  ],
  session: { strategy: "jwt" },
 
};
