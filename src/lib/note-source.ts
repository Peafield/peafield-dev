import matter from "gray-matter";
import { z } from "zod";

export function slugify(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics (combining marks)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumerics -> hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

export type NoteFormFields = {
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  draft: boolean;
};

// Form-level schema: date stays a string here (the file format), unlike the
// runtime read schema in notes.ts which coerces to a Date.
const formSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  summary: z.string().min(1),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

export function parseNoteSource(raw: string): {
  fields: NoteFormFields;
  body: string;
} {
  const { data, content } = matter(raw);
  return {
    fields: {
      title: String(data.title ?? ""),
      date: toDateString(data.date),
      summary: String(data.summary ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      draft: Boolean(data.draft ?? false),
    },
    body: content,
  };
}

export function serializeNote(fields: NoteFormFields, body: string): string {
  const valid = formSchema.parse(fields);
  return matter.stringify(body, {
    title: valid.title,
    date: valid.date,
    summary: valid.summary,
    tags: valid.tags,
    draft: valid.draft,
  });
}
