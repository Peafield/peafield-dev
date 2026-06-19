"use client";

import { useActionState, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { NoteActionState } from "@/app/admin/actions";
import type { NoteFormFields } from "@/lib/note-source";
import MarkdownToolbar from "./MarkdownToolbar";
import type { EditorState } from "@/lib/markdown-commands";
import { toggleWrap, insertLink } from "@/lib/markdown-commands";

type Props = {
  action: (prev: NoteActionState, formData: FormData) => Promise<NoteActionState>;
  initialFields?: NoteFormFields;
  initialBody?: string;
};

const EMPTY: NoteFormFields = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  summary: "",
  tags: [],
  draft: false,
};

export default function NoteEditor({ action, initialFields, initialBody }: Props) {
  const fields = initialFields ?? EMPTY;
  const [body, setBody] = useState(initialBody ?? "");
  const [preview, setPreview] = useState("");
  const [state, formAction, pending] = useActionState(action, {});

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

  useEffect(() => {
    const handle = setTimeout(async () => {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      setPreview(await res.text());
    }, 400);
    return () => clearTimeout(handle);
  }, [body]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form action={formAction} className="flex flex-col gap-4 font-openSans">
        {state.error && <p className="text-error">{state.error}</p>}
        <label className="flex flex-col gap-1">
          Title
          <input name="title" defaultValue={fields.title} required
            className="rounded border border-gray-300 p-2 dark:bg-zinc-900" />
        </label>
        <label className="flex flex-col gap-1">
          Date
          <input name="date" type="date" defaultValue={fields.date} required
            className="rounded border border-gray-300 p-2 dark:bg-zinc-900" />
        </label>
        <label className="flex flex-col gap-1">
          Summary
          <input name="summary" defaultValue={fields.summary} required
            className="rounded border border-gray-300 p-2 dark:bg-zinc-900" />
        </label>
        <label className="flex flex-col gap-1">
          Tags (comma-separated)
          <input name="tags" defaultValue={fields.tags.join(", ")}
            className="rounded border border-gray-300 p-2 dark:bg-zinc-900" />
        </label>
        <label className="flex items-center gap-2">
          <input name="draft" type="checkbox" defaultChecked={fields.draft} />
          Draft
        </label>
        <label className="flex flex-col gap-1">
          Body (MDX)
          <MarkdownToolbar textareaRef={textareaRef} onChange={apply} />
          <textarea ref={textareaRef} name="body" value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={onBodyKeyDown}
            rows={18}
            className="rounded border border-gray-300 p-2 font-mono dark:bg-zinc-900" />
        </label>
        <button type="submit" disabled={pending}
          className="self-start rounded bg-terminal px-4 py-2 text-black disabled:opacity-50">
          {pending ? "Saving…" : "Save & commit"}
        </button>
      </form>
      <div
        className="prose dark:prose-invert max-w-none"
        // Preview HTML comes from our own auth-gated server route, compiled from
        // the author's own input — not third-party content.
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    </div>
  );
}
