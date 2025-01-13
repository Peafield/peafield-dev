"use client";

import { useRouter } from "next/navigation";
import Container from "./Container";

const TempPage = () => {
  const router = useRouter();
  return (
    <Container>
      <div className="prose dark:prose-invert m-auto p-8 md:py-8 md:px-0">
        <h1>Oops! There is nothing here...</h1>
        <button type="button" onClick={() => router.push("/")}>
          Go back
        </button>
      </div>
    </Container>
  );
};

export default TempPage;
