import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { isAllowedLogin } from "@/lib/auth-allowlist";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // GitHub exposes the username as profile.login. Only the configured
    // admin account may sign in; everyone else is rejected at the door.
    async signIn({ profile }) {
      const login = profile?.login as string | undefined;
      return isAllowedLogin(login, process.env.ADMIN_GITHUB_LOGIN);
    },
  },
});
