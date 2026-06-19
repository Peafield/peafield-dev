# Markdown toolbar for the MDX note editor

**Date:** 2026-06-19
**Status:** Approved (design)

## Goal

Add simple rich-text editing to the admin note editor
(`src/components/admin/NoteEditor.tsx`) without adopting a heavyweight editor
library such as TipTap. The note body is MDX and already has a live preview
pane, so the editor adds a markdown-syntax toolbar (and a few keyboard
shortcuts) over the existing `<textarea>`. MDX remains the source of truth.

## Non-goals (YAGNI)

- WYSIWYG / contenteditable editing.
- Image upload, tables, custom undo stack (browser-native textarea undo is kept).
- Any change to how MDX is stored, committed, or previewed.

## Architecture

Three pieces, smallest blast radius first:

### 1. `src/lib/markdown-commands.ts` — pure transform functions

React-free, dependency-free. Each command takes and returns a selection state:

```ts
type EditorState = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
};
```

Functions:

- `toggleWrap(state, marker): EditorState` — inline wrap with `**` (bold),
  `*` (italic), or `` ` `` (inline code). If the selection is already wrapped
  in `marker`, it is unwrapped (toggle off). With an empty selection, the
  markers are inserted and the cursor is placed between them.
- `toggleLinePrefix(state, prefix): EditorState` — line-level prefixes for
  blockquote (`> `), bullet list (`- `), numbered list (`1. `). Applies to
  every line the selection touches; if all touched lines already start with
  the prefix, it is removed (toggle off).
- `cycleHeading(state): EditorState` — operates on the current line, cycling
  its heading level `none -> # -> ## -> ### -> none`. Replaces any existing
  leading `#{1,3} ` run on that line.
- `insertLink(state): EditorState` — wraps the selection as
  `[selection](url)` and returns a selection covering the `url` placeholder so
  the user can type the URL immediately. With an empty selection, inserts
  `[text](url)` with `text` selected.
- `toggleFence(state): EditorState` — wraps the selection in a triple-backtick
  fenced code block on its own lines; toggles off if already fenced.

These are the unit-test target.

### 2. `src/components/admin/MarkdownToolbar.tsx`

Client component. Props:

```ts
type Props = {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onChange: (next: EditorState) => void;
};
```

Renders a row of buttons using `react-icons` (already a dependency):
Bold, Italic, Heading (cycle), Link, Inline code, Code block, Bullet list,
Numbered list, Quote. Each button:

1. Reads the live selection from `textareaRef.current`
   (`value`, `selectionStart`, `selectionEnd`).
2. Runs the matching command from `markdown-commands.ts`.
3. Calls `onChange(nextState)`.

Buttons use `type="button"` (so they never submit the form) and
`onMouseDown` with `preventDefault` so the textarea keeps focus / selection.

### 3. `NoteEditor.tsx` wiring

- Add `const textareaRef = useRef<HTMLTextAreaElement>(null)`.
- Add a `pendingSelection` ref (`{ start, end } | null`).
- Render `<MarkdownToolbar textareaRef={textareaRef} onChange={apply} />`
  directly above the body `<textarea>`.
- `apply(next)` sets `body` via `setBody(next.value)` and stores
  `{ next.selectionStart, next.selectionEnd }` in `pendingSelection`.
- A `useLayoutEffect` keyed on `body` applies and clears `pendingSelection`
  onto `textareaRef.current` after each controlled re-render, then refocuses.
- `onKeyDown` on the textarea adds shortcuts: Cmd/Ctrl+B (bold),
  Cmd/Ctrl+I (italic), Cmd/Ctrl+K (link). Each `preventDefault`s and runs the
  same `apply` path.

## Data flow

textarea stays controlled (`value={body}`). Toolbar/shortcut → pure command →
`setBody` → existing 400ms debounced `POST /api/preview` re-renders the preview
pane. No other data path changes.

## Testing

Use the project's existing **`bun test`** runner (tests are colocated as
`src/lib/*.test.ts` and import from `bun:test`). No new test dependency is
added. Unit-test `markdown-commands.ts` covering, per command: empty
selection, selection present, and toggle-off (where applicable), asserting
both the resulting `value` and the returned selection range. Heading cycling
is tested across the full `none -> # -> ## -> ### -> none` loop.

## Files touched

- `src/lib/markdown-commands.ts` (new)
- `src/lib/markdown-commands.test.ts` (new)
- `src/components/admin/MarkdownToolbar.tsx` (new)
- `src/components/admin/NoteEditor.tsx` (edit: ref, toolbar, shortcuts, selection restore)

No `package.json` or test-config changes — the existing `bun test` setup is reused.
