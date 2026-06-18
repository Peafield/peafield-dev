import { auth } from "@/auth";
import Container from "@/components/Container";
import NoteEditor from "@/components/admin/NoteEditor";
import { createNote } from "../actions";

export default async function NewNotePage() {
  // Page-level auth guard — the layout is not a security boundary.
  const session = await auth();
  if (!session) return null;
  return (
    <Container>
      <div className="py-8">
        <h1 className="mb-6 font-openSans text-2xl font-medium">New note</h1>
        <NoteEditor action={createNote} />
      </div>
    </Container>
  );
}
