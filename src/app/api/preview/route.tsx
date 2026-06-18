import { compileMDX } from "next-mdx-remote/rsc";
import { auth } from "@/auth";

// Preview-only component map: plain <a> (no next/link) to avoid needing router
// context during server render. Table mirrors the real note renderer.
const components = {
  a: (props: React.ComponentPropsWithoutRef<"a">) => <a {...props} />,
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>{data.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {data.rows.map((row, i) => (
          <tr key={i}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  ),
};

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { body } = (await request.json()) as { body?: string };
  try {
    const { content } = await compileMDX({
      source: body ?? "",
      components,
      options: { parseFrontmatter: false },
    });
    // Dynamic require avoids Next.js RSC webpack bundler blocking
    // react-dom/server at static import analysis time; Route Handlers run
    // in Node.js (not in the browser RSC bundle), so this is safe at runtime.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { renderToStaticMarkup } = require("react-dom/server") as typeof import("react-dom/server");
    const html = renderToStaticMarkup(content as React.ReactElement);
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Preview failed";
    return new Response(`<p class="text-error">${message}</p>`, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}
