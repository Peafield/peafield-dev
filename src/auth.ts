import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { isAllowedLogin } from "@/lib/auth-allowlist";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Self-hosted behind a reverse proxy (Docker, not Vercel), so Auth.js does
  // not auto-trust the host. Without this, in production `auth()` does not
  // return null for an anonymous request — it swallows an `UntrustedHost`
  // error and returns a truthy error object, which silently passes a naive
  // `if (!session)` check and leaks the /admin pages. See errors.authjs.dev#untrustedhost.
  trustHost: true,
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
