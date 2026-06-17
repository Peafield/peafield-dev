import { describe, expect, test } from "bun:test";
import { slugify } from "./note-source";

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
