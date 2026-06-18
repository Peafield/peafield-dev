import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Container from "@/components/Container";
import NoteEditor from "@/components/admin/NoteEditor";
import { getGithubClient } from "@/lib/github";
import { parseNoteSource } from "@/lib/note-source";
import { updateNote } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Page-level auth guard, before any data access — the layout is not a
  // security boundary in the App Router.
  const session = await auth();
  if (!session) return null;
  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) notFound();
  const { raw } = await getGithubClient().getNoteSource(slug);
  const { fields, body } = parseNoteSource(raw);
  const action = updateNote.bind(null, slug);
  return (
    <Container>
      <div className="py-8">
        <h1 className="mb-6 font-openSans text-2xl font-medium">Edit: {slug}</h1>
        <NoteEditor action={action} initialFields={fields} initialBody={body} />
      </div>
    </Container>
  );
}
