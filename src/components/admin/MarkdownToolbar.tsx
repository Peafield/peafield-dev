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
