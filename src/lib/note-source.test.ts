import { describe, expect, test } from "bun:test";
import { slugify, parseNoteSource, serializeNote, type NoteFormFields } from "./note-source";

describe("slugify", () => {
  test("lowercases, trims, and hyphenates", () => {
    expect(slugify("  Hello World  ")).toBe("hello-world");
  });
  test("strips punctuation and collapses separators", () => {
    expect(slugify("A Note: Part 1 (draft!)")).toBe("a-note-part-1-draft");
  });
  test("produces a slug matching ^[a-z0-9-]+$", () => {
    expect(slugify("Café déjà vu")).toMatch(/^[a-z0-9-]+$/);
  });
});

const fields: NoteFormFields = {
  title: "Hello World",
  date: "2026-06-17",
  summary: "A summary.",
  tags: ["a", "b"],
  draft: false,
};
const body = "## Heading\n\nSome **content**.";

describe("serializeNote + parseNoteSource", () => {
  test("round-trips fields and body", () => {
    const raw = serializeNote(fields, body);
    const parsed = parseNoteSource(raw);
    expect(parsed.fields).toEqual(fields);
    expect(parsed.body.trim()).toBe(body.trim());
  });

  test("normalizes a Date in frontmatter to a YYYY-MM-DD string", () => {
    const raw = `---\ntitle: "T"\ndate: 2026-01-05\nsummary: "s"\n---\nBody.`;
    const parsed = parseNoteSource(raw);
    expect(parsed.fields.date).toBe("2026-01-05");
    expect(parsed.fields.tags).toEqual([]);
    expect(parsed.fields.draft).toBe(false);
  });

  test("serializeNote throws on invalid fields (empty title)", () => {
    expect(() => serializeNote({ ...fields, title: "" }, body)).toThrow();
  });
});
