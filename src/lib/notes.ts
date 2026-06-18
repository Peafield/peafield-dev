import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

export const noteFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  summary: z.string().min(1),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export type NoteFrontmatter = z.infer<typeof noteFrontmatterSchema>;
export type NoteMeta = NoteFrontmatter & { slug: string };

export function parseFrontmatter(raw: string, slug: string): NoteMeta {
  const { data } = matter(raw);
  const result = noteFrontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in note "${slug}": ${result.error.message}`,
    );
  }
  return { ...result.data, slug };
}

export function selectVisibleNotes(
  notes: NoteMeta[],
  { includeDrafts }: { includeDrafts: boolean },
): NoteMeta[] {
  return notes
    .filter((note) => includeDrafts || !note.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

const NOTES_DIR = path.join(process.cwd(), "src", "content", "notes");

export function getNoteSlugs(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllNotes(): NoteMeta[] {
  const notes = getNoteSlugs().map((slug) => {
    const raw = fs.readFileSync(path.join(NOTES_DIR, `${slug}.mdx`), "utf8");
    return parseFrontmatter(raw, slug);
  });
  return selectVisibleNotes(notes, {
    includeDrafts: process.env.NODE_ENV !== "production",
  });
}

export async function getNote(slug: string) {
  const raw = fs.readFileSync(path.join(NOTES_DIR, `${slug}.mdx`), "utf8");
  const meta = parseFrontmatter(raw, slug);
  const { default: Content } = await import(`@/content/notes/${slug}.mdx`);
  return { Content, meta };
}
