import { describe, expect, test, mock } from "bun:test";
import { createGithubClient } from "./github";

function fakeOctokit() {
  const calls: { method: string; args: unknown }[] = [];
  const rest = {
    repos: {
      getContent: mock(async (args: unknown) => {
        calls.push({ method: "getContent", args });
        return {
          data: { content: Buffer.from("hello").toString("base64"), sha: "abc" },
        };
      }),
      createOrUpdateFileContents: mock(async (args: unknown) => {
        calls.push({ method: "put", args });
        return { data: {} };
      }),
      deleteFile: mock(async (args: unknown) => {
        calls.push({ method: "delete", args });
        return { data: {} };
      }),
    },
  };
  return { octokit: { rest }, calls };
}

const config = { owner: "me", repo: "site", branch: "main" };

describe("github client", () => {
  test("getNoteSource decodes content and returns sha", async () => {
    const { octokit } = fakeOctokit();
    const gh = createGithubClient(octokit as never, config);
    const res = await gh.getNoteSource("hello-world");
    expect(res.raw).toBe("hello");
    expect(res.sha).toBe("abc");
  });

  test("putNote sends base64 content, branch, and sha for updates", async () => {
    const { octokit, calls } = fakeOctokit();
    const gh = createGithubClient(octokit as never, config);
    await gh.putNote("hello-world", "new content", "sha123");
    const put = calls.find((c) => c.method === "put")!.args as Record<string, unknown>;
    expect(put.path).toBe("src/content/notes/hello-world.mdx");
    expect(put.branch).toBe("main");
    expect(put.sha).toBe("sha123");
    expect(Buffer.from(put.content as string, "base64").toString()).toBe("new content");
  });

  test("deleteNote passes sha and branch", async () => {
    const { octokit, calls } = fakeOctokit();
    const gh = createGithubClient(octokit as never, config);
    await gh.deleteNote("hello-world", "sha123");
    const del = calls.find((c) => c.method === "delete")!.args as Record<string, unknown>;
    expect(del.path).toBe("src/content/notes/hello-world.mdx");
    expect(del.sha).toBe("sha123");
    expect(del.branch).toBe("main");
  });
});
