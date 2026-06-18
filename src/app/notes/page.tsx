import Link from "next/link";
import { getAllNotes } from "@/lib/notes";

export const metadata = {
  title: "Notes",
  description: "Notes and writing.",
};

export default function NotesIndexPage() {
  const notes = getAllNotes();

  if (notes.length === 0) {
    return (
      <p className="font-openSans text-gray-600 dark:text-zinc-400">
        No notes yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-8 py-8">
      {notes.map((note) => (
        <li key={note.slug}>
          <Link
            href={`/notes/${note.slug}`}
            className="font-openSans text-2xl font-medium hover:text-hoverColor"
          >
            {note.title}
          </Link>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {note.date.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </p>
          <p className="text-gray-700 dark:text-zinc-300">{note.summary}</p>
          {note.tags.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
