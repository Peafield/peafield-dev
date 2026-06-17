import { describe, expect, test } from "bun:test";
import { parseFrontmatter, selectVisibleNotes, type NoteMeta } from "./notes";

const validRaw = `---
title: "Test Note"
date: 2026-01-15
summary: "A summary."
tags: ["a", "b"]
---
Body content.`;

describe("parseFrontmatter", () => {
  test("parses valid frontmatter and attaches the slug", () => {
    const meta = parseFrontmatter(validRaw, "test-note");
    expect(meta.slug).toBe("test-note");
    expect(meta.title).toBe("Test Note");
    expect(meta.summary).toBe("A summary.");
    expect(meta.tags).toEqual(["a", "b"]);
    expect(meta.draft).toBe(false);
    expect(meta.date.getFullYear()).toBe(2026);
  });

  test("defaults tags to [] and draft to false when omitted", () => {
    const raw = `---
title: "Minimal"
date: 2026-02-01
summary: "No tags or draft."
---
Body.`;
    const meta = parseFrontmatter(raw, "minimal");
    expect(meta.tags).toEqual([]);
    expect(meta.draft).toBe(false);
  });

  test("throws when a required field is missing", () => {
    const raw = `---
date: 2026-01-01
summary: "Missing title."
---
Body.`;
    expect(() => parseFrontmatter(raw, "broken")).toThrow(/broken/);
  });
});

function meta(slug: string, date: string, draft = false): NoteMeta {
  return {
    slug,
    title: slug,
    date: new Date(date),
    summary: "s",
    tags: [],
    draft,
  };
}

describe("selectVisibleNotes", () => {
  const notes = [
    meta("old", "2026-01-01"),
    meta("new", "2026-03-01"),
    meta("wip", "2026-02-01", true),
  ];

  test("sorts newest-first", () => {
    const result = selectVisibleNotes(notes, { includeDrafts: true });
    expect(result.map((n) => n.slug)).toEqual(["new", "wip", "old"]);
  });

  test("drops drafts when includeDrafts is false", () => {
    const result = selectVisibleNotes(notes, { includeDrafts: false });
    expect(result.map((n) => n.slug)).toEqual(["new", "old"]);
  });
});
