# Markdown Toolbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a markdown-syntax toolbar and keyboard shortcuts to the admin note editor so the MDX body can be formatted without typing markdown by hand.

**Architecture:** Pure, React-free transform functions in `src/lib/markdown-commands.ts` take and return an `EditorState` (value + selection range). A `MarkdownToolbar` client component reads the live textarea selection, runs a command, and reports the new state up. `NoteEditor` keeps the textarea controlled, applies new state, and restores the selection after re-render via a `useLayoutEffect`. MDX stays the source of truth and the existing live-preview pane is unchanged.

**Tech Stack:** Next 16, React 19, TypeScript, Tailwind, `react-icons` (existing dep), `bun test` (existing runner).

## Global Constraints

- Test runner is `bun test`; tests are colocated `*.test.ts` files importing from `bun:test`. Do NOT add Vitest or any new test dependency.
- Do NOT add new runtime dependencies; icons come from `react-icons` (already installed).
- Lint/format is Biome (`bun run lint`); type-check is `bun run check-types` (`tsc --noEmit`).
- The body `<textarea>` stays controlled (`value={body}`) and MDX remains the stored source format.
- Toolbar buttons must be `type="button"` and must not steal the textarea selection (use `onMouseDown` + `preventDefault`).

---

### Task 1: Pure markdown command functions

**Files:**
- Create: `src/lib/markdown-commands.ts`
- Test: `src/lib/markdown-commands.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type EditorState = { value: string; selectionStart: number; selectionEnd: number }`
  - `toggleWrap(state: EditorState, marker: string): EditorState`
  - `cycleHeading(state: EditorState): EditorState`
  - `toggleLinePrefix(state: EditorState, prefix: string): EditorState`
  - `insertLink(state: EditorState): EditorState`
  - `toggleFence(state: EditorState): EditorState`

- [ ] **Step 1: Write the failing tests**

```ts
// src/lib/markdown-commands.test.ts
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
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `bun test src/lib/markdown-commands.test.ts`
Expected: FAIL — module `./markdown-commands` cannot be resolved.

- [ ] **Step 3: Write the implementation**

```ts
// src/lib/markdown-commands.ts

export type EditorState = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
};

// Inline wrap toggle: bold (**), italic (*), inline code (`).
export function toggleWrap(state: EditorState, marker: string): EditorState {
  const { value, selectionStart, selectionEnd } = state;
  const before = value.slice(0, selectionStart);
  const selected = value.slice(selectionStart, selectionEnd);
  const after = value.slice(selectionEnd);
  const len = marker.length;

  // Already wrapped immediately outside the selection -> unwrap.
  if (
    before.endsWith(marker) &&
    after.startsWith(marker) &&
    selectionStart >= len
  ) {
    const newBefore = before.slice(0, before.length - len);
    const newValue = newBefore + selected + after.slice(len);
    return {
      value: newValue,
      selectionStart: newBefore.length,
      selectionEnd: newBefore.length + selected.length,
    };
  }

  if (selectionStart === selectionEnd) {
    // Empty selection: insert markers, drop cursor in the middle.
    const cursor = selectionStart + len;
    return {
      value: before + marker + marker + after,
      selectionStart: cursor,
      selectionEnd: cursor,
    };
  }

  const newValue = before + marker + selected + marker + after;
  return {
    value: newValue,
    selectionStart: selectionStart + len,
    selectionEnd: selectionEnd + len,
  };
}

// Find the [start, end) bounds of every line the selection touches.
function lineBounds(value: string, start: number, end: number) {
  const from = value.lastIndexOf("\n", start - 1) + 1;
  const nl = value.indexOf("\n", end);
  const to = nl === -1 ? value.length : nl;
  return { from, to };
}

export function cycleHeading(state: EditorState): EditorState {
  const { value, selectionStart } = state;
  const from = value.lastIndexOf("\n", selectionStart - 1) + 1;
  const nl = value.indexOf("\n", selectionStart);
  const to = nl === -1 ? value.length : nl;
  const line = value.slice(from, to);

  const match = line.match(/^(#{1,3}) /);
  const level = match ? match[1].length : 0;
  const stripped = match ? line.slice(match[0].length) : line;
  const next = level >= 3 ? 0 : level + 1;
  const newLine = next === 0 ? stripped : `${"#".repeat(next)} ${stripped}`;

  const newValue = value.slice(0, from) + newLine + value.slice(to);
  const delta = newLine.length - line.length;
  const caret = to + delta;
  return { value: newValue, selectionStart: caret, selectionEnd: caret };
}

export function toggleLinePrefix(state: EditorState, prefix: string): EditorState {
  const { value, selectionStart, selectionEnd } = state;
  const { from, to } = lineBounds(value, selectionStart, selectionEnd);
  const block = value.slice(from, to);
  const lines = block.split("\n");
  const allPrefixed = lines.every((l) => l.startsWith(prefix));
  const newLines = allPrefixed
    ? lines.map((l) => l.slice(prefix.length))
    : lines.map((l) => prefix + l);
  const newBlock = newLines.join("\n");
  const newValue = value.slice(0, from) + newBlock + value.slice(to);
  return {
    value: newValue,
    selectionStart: from,
    selectionEnd: from + newBlock.length,
  };
}

export function insertLink(state: EditorState): EditorState {
  const { value, selectionStart, selectionEnd } = state;
  const before = value.slice(0, selectionStart);
  const selected = value.slice(selectionStart, selectionEnd);
  const after = value.slice(selectionEnd);
  const text = selected || "text";
  const head = `${before}[${text}](`;
  const newValue = `${head}url)${after}`;
  return {
    value: newValue,
    selectionStart: head.length,
    selectionEnd: head.length + 3, // length of "url"
  };
}

export function toggleFence(state: EditorState): EditorState {
  const { value, selectionStart, selectionEnd } = state;
  const before = value.slice(0, selectionStart);
  const selected = value.slice(selectionStart, selectionEnd);
  const after = value.slice(selectionEnd);

  const fenced = selected.match(/^```\n([\s\S]*)\n```$/);
  if (fenced) {
    const inner = fenced[1];
    const newValue = before + inner + after;
    return {
      value: newValue,
      selectionStart: before.length,
      selectionEnd: before.length + inner.length,
    };
  }

  const block = "```\n" + selected + "\n```";
  const newValue = before + block + after;
  return {
    value: newValue,
    selectionStart: before.length,
    selectionEnd: before.length + block.length,
  };
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `bun test src/lib/markdown-commands.test.ts`
Expected: PASS — all tests green.

- [ ] **Step 5: Type-check and commit**

```bash
bun run check-types
git add src/lib/markdown-commands.ts src/lib/markdown-commands.test.ts
git commit -m "feat: pure markdown command transforms for note editor"
```

---

### Task 2: MarkdownToolbar component

**Files:**
- Create: `src/components/admin/MarkdownToolbar.tsx`

**Interfaces:**
- Consumes: from Task 1 — `EditorState`, `toggleWrap`, `cycleHeading`, `toggleLinePrefix`, `insertLink`, `toggleFence`.
- Produces:
  - Default export `MarkdownToolbar`
  - Props: `{ textareaRef: React.RefObject<HTMLTextAreaElement | null>; onChange: (next: EditorState) => void }`

- [ ] **Step 1: Write the component**

```tsx
// src/components/admin/MarkdownToolbar.tsx
"use client";

import type { RefObject } from "react";
import {
  LuBold,
  LuItalic,
  LuHeading,
  LuLink,
  LuCode,
  LuSquareCode,
  LuList,
  LuListOrdered,
  LuQuote,
} from "react-icons/lu";
import {
  type EditorState,
  toggleWrap,
  cycleHeading,
  toggleLinePrefix,
  insertLink,
  toggleFence,
} from "@/lib/markdown-commands";

type Props = {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (next: EditorState) => void;
};

type Cmd = (s: EditorState) => EditorState;

const BUTTONS: { label: string; icon: React.ReactNode; run: Cmd }[] = [
  { label: "Bold", icon: <LuBold />, run: (s) => toggleWrap(s, "**") },
  { label: "Italic", icon: <LuItalic />, run: (s) => toggleWrap(s, "*") },
  { label: "Heading", icon: <LuHeading />, run: cycleHeading },
  { label: "Link", icon: <LuLink />, run: insertLink },
  { label: "Inline code", icon: <LuCode />, run: (s) => toggleWrap(s, "`") },
  { label: "Code block", icon: <LuSquareCode />, run: toggleFence },
  { label: "Bullet list", icon: <LuList />, run: (s) => toggleLinePrefix(s, "- ") },
  { label: "Numbered list", icon: <LuListOrdered />, run: (s) => toggleLinePrefix(s, "1. ") },
  { label: "Quote", icon: <LuQuote />, run: (s) => toggleLinePrefix(s, "> ") },
];

export default function MarkdownToolbar({ textareaRef, onChange }: Props) {
  const apply = (run: Cmd) => {
    const el = textareaRef.current;
    if (!el) return;
    onChange(
      run({
        value: el.value,
        selectionStart: el.selectionStart,
        selectionEnd: el.selectionEnd,
      }),
    );
  };

  return (
    <div className="flex flex-wrap gap-1 rounded border border-gray-300 p-1 dark:border-zinc-700">
      {BUTTONS.map((b) => (
        <button
          key={b.label}
          type="button"
          title={b.label}
          aria-label={b.label}
          // Keep the textarea's selection: don't let the button take focus.
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => apply(b.run)}
          className="rounded p-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          {b.icon}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify the icon names exist**

Run: `node -e "const i=require('react-icons/lu'); ['LuBold','LuItalic','LuHeading','LuLink','LuCode','LuSquareCode','LuList','LuListOrdered','LuQuote'].forEach(n=>{if(!i[n])throw new Error('missing '+n)}); console.log('ok')"`
Expected: prints `ok`. If any name is missing, substitute the nearest `Lu*` icon and update the import + `BUTTONS` entry.

- [ ] **Step 3: Type-check, lint, and commit**

```bash
bun run check-types
bun run lint
git add src/components/admin/MarkdownToolbar.tsx
git commit -m "feat: markdown toolbar component for note editor"
```

---

### Task 3: Wire the toolbar and shortcuts into NoteEditor

**Files:**
- Modify: `src/components/admin/NoteEditor.tsx`

**Interfaces:**
- Consumes: from Task 1 — `EditorState`; from Task 2 — default `MarkdownToolbar`.
- Produces: no new exports (internal wiring only).

- [ ] **Step 1: Update imports**

Replace the React import line and add the new imports near the top of `src/components/admin/NoteEditor.tsx`:

```tsx
import { useActionState, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { NoteActionState } from "@/app/admin/actions";
import type { NoteFormFields } from "@/lib/note-source";
import MarkdownToolbar from "./MarkdownToolbar";
import type { EditorState } from "@/lib/markdown-commands";
import { toggleWrap, insertLink } from "@/lib/markdown-commands";
```

- [ ] **Step 2: Add refs, the apply helper, and selection restore**

Inside the component, immediately after `const [state, formAction, pending] = useActionState(action, {});`, add:

```tsx
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pendingSelection = useRef<{ start: number; end: number } | null>(null);

  const apply = (next: EditorState) => {
    setBody(next.value);
    pendingSelection.current = { start: next.selectionStart, end: next.selectionEnd };
  };

  // Restore the caret/selection after the controlled textarea re-renders.
  useLayoutEffect(() => {
    const sel = pendingSelection.current;
    const el = textareaRef.current;
    if (sel && el) {
      el.focus();
      el.setSelectionRange(sel.start, sel.end);
      pendingSelection.current = null;
    }
  }, [body]);

  const onBodyKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.metaKey || e.ctrlKey)) return;
    const el = e.currentTarget;
    const cur: EditorState = {
      value: el.value,
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd,
    };
    const key = e.key.toLowerCase();
    if (key === "b") { e.preventDefault(); apply(toggleWrap(cur, "**")); }
    else if (key === "i") { e.preventDefault(); apply(toggleWrap(cur, "*")); }
    else if (key === "k") { e.preventDefault(); apply(insertLink(cur)); }
  };
```

- [ ] **Step 3: Render the toolbar and wire the textarea**

Replace the existing Body label block:

```tsx
        <label className="flex flex-col gap-1">
          Body (MDX)
          <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)}
            rows={18}
            className="rounded border border-gray-300 p-2 font-mono dark:bg-zinc-900" />
        </label>
```

with:

```tsx
        <label className="flex flex-col gap-1">
          Body (MDX)
          <MarkdownToolbar textareaRef={textareaRef} onChange={apply} />
          <textarea ref={textareaRef} name="body" value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={onBodyKeyDown}
            rows={18}
            className="rounded border border-gray-300 p-2 font-mono dark:bg-zinc-900" />
        </label>
```

- [ ] **Step 4: Type-check and lint**

Run: `bun run check-types && bun run lint`
Expected: no type errors; Biome reports no errors.

- [ ] **Step 5: Manual smoke test**

Run: `bun run dev`, sign in, open `/admin/new`. Verify:
- Selecting text and clicking **Bold** wraps it in `**` and keeps it selected.
- **Heading** cycles the current line `#` -> `##` -> `###` -> none.
- **Link** inserts `[sel](url)` with `url` selected.
- Cmd/Ctrl+B, +I, +K work.
- The live preview pane on the right updates after edits.

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/NoteEditor.tsx
git commit -m "feat: wire markdown toolbar and shortcuts into note editor"
```

---

## Self-Review Notes

- **Spec coverage:** all five command functions (Task 1), toolbar with the nine buttons (Task 2), NoteEditor ref/toolbar/shortcuts/selection-restore (Task 3), `bun test` coverage (Task 1). Heading-cycle requirement covered by `cycleHeading` + its test.
- **No new deps:** icons from existing `react-icons/lu`; tests via existing `bun test`. Step 2 of Task 2 guards against wrong icon names.
- **Type consistency:** `EditorState` and all command signatures defined in Task 1 are reused verbatim in Tasks 2 and 3.
