import { Octokit } from "@octokit/rest";

const NOTES_PATH = "src/content/notes";
const SLUG_RE = /^[a-z0-9-]+$/;

export type GithubConfig = { owner: string; repo: string; branch: string };

// Validate here so every GitHub path is safe by construction — guards against
// path traversal regardless of which caller built the slug.
function notePath(slug: string): string {
  if (!SLUG_RE.test(slug)) {
    throw new Error(`Invalid note slug: ${slug}`);
  }
  return `${NOTES_PATH}/${slug}.mdx`;
}

// Pure factory so tests can inject a fake Octokit. Production callers use
// getGithubClient() below.
export function createGithubClient(octokit: Octokit, config: GithubConfig) {
  const { owner, repo, branch } = config;

  return {
    async listNotes(): Promise<{ slug: string; sha: string }[]> {
      let res: Awaited<ReturnType<typeof octokit.rest.repos.getContent>>;
      try {
        res = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: NOTES_PATH,
          ref: branch,
        });
      } catch (err) {
        // The notes directory doesn't exist yet (no notes) — GitHub returns
        // 404 for a missing path. Treat that as an empty list, not an error.
        if ((err as { status?: number }).status === 404) return [];
        throw err;
      }
      const items = Array.isArray(res.data) ? res.data : [];
      return items
        .filter((i) => i.type === "file" && i.name.endsWith(".mdx"))
        .map((i) => ({ slug: i.name.replace(/\.mdx$/, ""), sha: i.sha }));
    },

    async getNoteSource(slug: string): Promise<{ raw: string; sha: string }> {
      const res = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: notePath(slug),
        ref: branch,
      });
      const data = res.data as { content?: string; sha: string };
      const raw = Buffer.from(data.content ?? "", "base64").toString("utf8");
      return { raw, sha: data.sha };
    },

    async putNote(slug: string, content: string, sha?: string): Promise<void> {
      await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        branch,
        path: notePath(slug),
        message: `cms: ${sha ? "update" : "create"} note ${slug}`,
        content: Buffer.from(content, "utf8").toString("base64"),
        ...(sha ? { sha } : {}),
      });
    },

    async deleteNote(slug: string, sha: string): Promise<void> {
      await octokit.rest.repos.deleteFile({
        owner,
        repo,
        branch,
        path: notePath(slug),
        message: `cms: delete note ${slug}`,
        sha,
      });
    },
  };
}

export function getGithubClient() {
  const [owner, repo] = (process.env.GITHUB_REPO ?? "").split("/");
  const branch = process.env.GITHUB_BRANCH ?? "main";
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
    // We handle non-2xx responses in code (e.g. a 404 when the notes directory
    // doesn't exist yet is caught and treated as empty), and real failures are
    // surfaced by the calling server action / page. Octokit's own request
    // logging is therefore redundant noise — silence it.
    log: { debug() {}, info() {}, warn() {}, error() {} },
  });
  return createGithubClient(octokit, { owner, repo, branch });
}
