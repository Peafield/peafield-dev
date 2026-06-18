"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getGithubClient } from "@/lib/github";
import {
  serializeNote,
  slugify,
  type NoteFormFields,
} from "@/lib/note-source";

export type NoteActionState = { error?: string };

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

const SLUG_RE = /^[a-z0-9-]+$/;

function readFields(formData: FormData): NoteFormFields {
  return {
    title: String(formData.get("title") ?? ""),
    date: String(formData.get("date") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    draft: formData.get("draft") === "on",
  };
}

export async function createNote(
  _prev: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  await requireAdmin();
  const fields = readFields(formData);
  const body = String(formData.get("body") ?? "");
  const slug = slugify(fields.title);
  if (!SLUG_RE.test(slug)) {
    return { error: "Title does not produce a valid slug." };
  }
  const gh = getGithubClient();
  const existing = await gh.listNotes();
  if (existing.some((n) => n.slug === slug)) {
    return { error: `A note with slug "${slug}" already exists.` };
  }
  let raw: string;
  try {
    raw = serializeNote(fields, body);
  } catch {
    return { error: "Invalid frontmatter. Check the required fields." };
  }
  await gh.putNote(slug, raw);
  redirect("/admin?committed=1");
}

export async function updateNote(
  slug: string,
  _prev: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  await requireAdmin();
  if (!SLUG_RE.test(slug)) return { error: "Invalid slug." };
  const fields = readFields(formData);
  const body = String(formData.get("body") ?? "");
  const gh = getGithubClient();
  const current = await gh.getNoteSource(slug);
  let raw: string;
  try {
    raw = serializeNote(fields, body);
  } catch {
    return { error: "Invalid frontmatter. Check the required fields." };
  }
  await gh.putNote(slug, raw, current.sha);
  redirect("/admin?committed=1");
}

export async function deleteNote(slug: string): Promise<void> {
  await requireAdmin();
  if (!SLUG_RE.test(slug)) throw new Error("Invalid slug.");
  const gh = getGithubClient();
  const current = await gh.getNoteSource(slug);
  await gh.deleteNote(slug, current.sha);
  redirect("/admin?committed=1");
}
