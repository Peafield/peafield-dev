"use client";

import { useActionState, useState } from "react";
import type { NoteActionState } from "@/app/admin/actions";
import type { NoteFormFields } from "@/lib/note-source";

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
  const [state, formAction, pending] = useActionState(action, {});

  return (
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
        <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)}
          rows={18}
          className="rounded border border-gray-300 p-2 font-mono dark:bg-zinc-900" />
      </label>
      <button type="submit" disabled={pending}
        className="self-start rounded bg-terminal px-4 py-2 text-black disabled:opacity-50">
        {pending ? "Saving…" : "Save & commit"}
      </button>
    </form>
  );
}
