import { Octokit } from "@octokit/rest";

export const handler = async (event) => {
  try {
    // Initialize the Octokit GitHub API client
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN, // GitHub Token from environment variables
    });

    // Example file content and repo details (replace with actual file, repo, etc.)
    const content = Buffer.from("Hello, world!").toString("base64");
    const owner = "Tanish431";  // GitHub username
    const repo = "final_combo";  // Repository name
    const path = "test_file.txt"; // Path in the repo

    const result = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Uploading a file via Netlify",
      content,  // Base64 encoded content
      committer: {
        name: "Tanish Soni",
        email: "tanishsoni431@gmail.com",
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "File uploaded successfully!", result }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "File upload failed", error: error.message }),
    };
  }
};
