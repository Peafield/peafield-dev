import { notFound } from "next/navigation";
import { getNote, getNoteSlugs } from "@/lib/notes";

// All slugs are known at build time; unknown slugs 404 instead of rendering.
export const dynamicParams = false;

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { meta } = await getNote(slug);
    return { title: meta.title, description: meta.summary };
  } catch {
    return {};
  }
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let note: Awaited<ReturnType<typeof getNote>>;
  try {
    note = await getNote(slug);
  } catch {
    notFound();
  }
  const { Content, meta } = note;

  return (
    <article className="prose dark:prose-invert m-auto p-8 md:py-8 md:px-0">
      <h1>{meta.title}</h1>
      <p className="text-sm text-gray-500 dark:text-zinc-400">
        {meta.date.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <Content />
    </article>
  );
}
