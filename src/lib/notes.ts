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
