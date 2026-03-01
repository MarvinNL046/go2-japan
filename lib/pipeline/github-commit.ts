const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "MarvinNL046";
const REPO_NAME = "go2-japan";
const BRANCH = "main";

export interface FileToCommit {
  path: string;
  content: string;
  encoding?: "utf-8" | "base64";
}

export async function commitFilesToGitHub(
  files: FileToCommit[],
  commitMessage: string
): Promise<{ sha: string; url: string }> {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not configured");
  }

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };

  const apiBase = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

  const refRes = await fetch(`${apiBase}/git/ref/heads/${BRANCH}`, { headers });
  if (!refRes.ok) throw new Error(`Failed to get ref: ${await refRes.text()}`);
  const refData = await refRes.json();
  const latestCommitSha = refData.object.sha;

  const commitRes = await fetch(`${apiBase}/git/commits/${latestCommitSha}`, { headers });
  if (!commitRes.ok) throw new Error(`Failed to get commit: ${await commitRes.text()}`);
  const commitData = await commitRes.json();
  const baseTreeSha = commitData.tree.sha;

  const treeItems = [];
  for (const file of files) {
    const blobRes = await fetch(`${apiBase}/git/blobs`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: file.encoding === "base64"
          ? file.content
          : Buffer.from(file.content, "utf-8").toString("base64"),
        encoding: "base64",
      }),
    });
    if (!blobRes.ok) {
      throw new Error(`Failed to create blob for ${file.path}: ${await blobRes.text()}`);
    }
    const blobData = await blobRes.json();
    treeItems.push({
      path: file.path,
      mode: "100644",
      type: "blob",
      sha: blobData.sha,
    });
  }

  const treeRes = await fetch(`${apiBase}/git/trees`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeItems,
    }),
  });
  if (!treeRes.ok) throw new Error(`Failed to create tree: ${await treeRes.text()}`);
  const treeData = await treeRes.json();

  const newCommitRes = await fetch(`${apiBase}/git/commits`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      message: commitMessage,
      tree: treeData.sha,
      parents: [latestCommitSha],
    }),
  });
  if (!newCommitRes.ok) {
    throw new Error(`Failed to create commit: ${await newCommitRes.text()}`);
  }
  const newCommitData = await newCommitRes.json();

  const updateRefRes = await fetch(`${apiBase}/git/refs/heads/${BRANCH}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ sha: newCommitData.sha }),
  });
  if (!updateRefRes.ok) {
    throw new Error(`Failed to update ref: ${await updateRefRes.text()}`);
  }

  console.log(`[github-commit] Committed ${files.length} files: ${newCommitData.sha}`);
  return {
    sha: newCommitData.sha,
    url: newCommitData.html_url,
  };
}
