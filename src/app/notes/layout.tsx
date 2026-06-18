import Container from "@/components/Container";
import React from "react";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The root <main> centers content vertically (great for the home hero);
  // notes are document-style, so fill the height to top-align the column.
  return (
    <div className="w-full flex-1">
      <Container>{children}</Container>
    </div>
  );
}