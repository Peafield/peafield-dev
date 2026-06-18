// Pure access-control decision, kept separate from auth.ts so it is unit-testable
// without pulling in next-auth.
export function isAllowedLogin(
  login: string | undefined | null,
  adminLogin: string | undefined | null,
): boolean {
  if (!login || !adminLogin) return false;
  return login.toLowerCase() === adminLogin.toLowerCase();
}
