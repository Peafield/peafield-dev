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

  if (selected) {
    // Selection becomes the link text; select the "url" placeholder so the
    // user types the URL straight away.
    const head = `${before}[${selected}](`;
    return {
      value: `${head}url)${after}`,
      selectionStart: head.length,
      selectionEnd: head.length + 3, // length of "url"
    };
  }

  // Empty selection: insert a template and select the "text" placeholder.
  const newValue = `${before}[text](url)${after}`;
  return {
    value: newValue,
    selectionStart: before.length + 1, // just after "["
    selectionEnd: before.length + 5, // length of "text"
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
