import Link from "next/link";
import Container from "@/components/Container";
import { getGithubClient } from "@/lib/github";
import { deleteNote } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminListPage() {
  const notes = await getGithubClient().listNotes();
  return (
    <Container>
      <div className="flex flex-col gap-6 py-8 font-openSans">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Notes</h1>
          <Link href="/admin/new" className="rounded bg-terminal px-3 py-1.5 text-black">
            New note
          </Link>
        </div>
        <ul className="flex flex-col gap-3">
          {notes.map((note) => (
            <li key={note.slug} className="flex items-center justify-between">
              <Link href={`/admin/edit/${note.slug}`} className="hover:text-hoverColor">
                {note.slug}
              </Link>
              <form action={deleteNote.bind(null, note.slug)}>
                <button type="submit" className="text-error">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
