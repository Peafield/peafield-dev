import Container from "@/components/Container";
import NoteEditor from "@/components/admin/NoteEditor";
import { createNote } from "../actions";

export default function NewNotePage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="mb-6 font-openSans text-2xl font-medium">New note</h1>
        <NoteEditor action={createNote} />
      </div>
    </Container>
  );
}
