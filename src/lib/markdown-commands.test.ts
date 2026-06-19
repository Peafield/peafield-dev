import { describe, expect, test } from "bun:test";
import {
  toggleWrap,
  cycleHeading,
  toggleLinePrefix,
  insertLink,
  toggleFence,
  type EditorState,
} from "./markdown-commands";

const at = (value: string, start: number, end = start): EditorState => ({
  value,
  selectionStart: start,
  selectionEnd: end,
});

describe("toggleWrap", () => {
  test("wraps a selection in the marker", () => {
    const r = toggleWrap(at("hello world", 0, 5), "**");
    expect(r.value).toBe("**hello** world");
    expect(r.value.slice(r.selectionStart, r.selectionEnd)).toBe("hello");
  });
  test("unwraps when the selection is already wrapped", () => {
    const r = toggleWrap(at("**hello** world", 2, 7), "**");
    expect(r.value).toBe("hello world");
    expect(r.value.slice(r.selectionStart, r.selectionEnd)).toBe("hello");
  });
  test("inserts markers and places cursor between them when empty", () => {
    const r = toggleWrap(at("ab", 1), "*");
    expect(r.value).toBe("a**b");
    expect(r.selectionStart).toBe(2);
    expect(r.selectionEnd).toBe(2);
  });
});

describe("cycleHeading", () => {
  test("cycles none -> h1 -> h2 -> h3 -> none on the current line", () => {
    let s = at("title", 2);
    s = cycleHeading(s);
    expect(s.value).toBe("# title");
    s = cycleHeading(s);
    expect(s.value).toBe("## title");
    s = cycleHeading(s);
    expect(s.value).toBe("### title");
    s = cycleHeading(s);
    expect(s.value).toBe("title");
  });
  test("only affects the line the cursor is on", () => {
    const r = cycleHeading(at("one\ntwo\nthree", 5)); // cursor on "two"
    expect(r.value).toBe("one\n# two\nthree");
  });
});

describe("toggleLinePrefix", () => {
  test("prefixes every line the selection touches", () => {
    const r = toggleLinePrefix(at("a\nb", 0, 3), "> ");
    expect(r.value).toBe("> a\n> b");
  });
  test("removes the prefix when all touched lines already have it", () => {
    const r = toggleLinePrefix(at("- a\n- b", 0, 7), "- ");
    expect(r.value).toBe("a\nb");
  });
});

describe("insertLink", () => {
  test("wraps selection and selects the url placeholder", () => {
    const r = insertLink(at("see docs here", 4, 8)); // "docs"
    expect(r.value).toBe("see [docs](url) here");
    expect(r.value.slice(r.selectionStart, r.selectionEnd)).toBe("url");
  });
  test("inserts a template and selects 'text' when empty", () => {
    const r = insertLink(at("", 0));
    expect(r.value).toBe("[text](url)");
    expect(r.value.slice(r.selectionStart, r.selectionEnd)).toBe("text");
  });
});

describe("toggleFence", () => {
  test("wraps selection in a fenced block on its own lines", () => {
    const r = toggleFence(at("code", 0, 4));
    expect(r.value).toBe("```\ncode\n```");
  });
  test("unwraps an existing fenced block", () => {
    const r = toggleFence(at("```\ncode\n```", 0, 12));
    expect(r.value).toBe("code");
  });
});
