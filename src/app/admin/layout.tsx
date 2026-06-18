import { auth, signIn } from "@/auth";
import Container from "@/components/Container";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return (
      <Container>
        <div className="flex flex-col items-center gap-4 py-16">
          <h1 className="font-openSans text-2xl font-medium">Admin sign-in</h1>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button
              type="submit"
              className="rounded bg-terminal px-4 py-2 font-openSans text-black"
            >
              Sign in with GitHub
            </button>
          </form>
        </div>
      </Container>
    );
  }

  return <div className="w-full flex-1">{children}</div>;
}
