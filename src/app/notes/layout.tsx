import Container from "@/components/Container";
import React from "react";

export default function NotesLayout({children}: {children: React.ReactNode}) {
    return (
        <Container>
            <div className="prose dark:prose-invert m-auto p-8 md:py-8 md:px-0">
                {children}
            </div>
        </Container>
    )
}