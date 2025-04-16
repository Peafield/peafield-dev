"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { JSONContent } from "@tiptap/react";
import { useState } from "react";

export default function Page() {
  const [post, setPost] = useState<JSONContent>();
  const onChange = (content: JSONContent) => {
    setPost(content);
    console.log(content);
  };

  return <SimpleEditor onChange={onChange} />;
}
