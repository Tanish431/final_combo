import { Octokit } from '@octokit/rest';

export async function handler(event) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,  // Ensure GITHUB_TOKEN is set as an environment variable
  });

  const content = Buffer.from(event.body).toString('base64');  // Convert file content to base64

  try {
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: 'your-username',
      repo: 'your-repo',
      path: 'path/to/file.xlsx',
      message: 'Update grade table',
      content: content,
      committer: {
        name: 'Netlify Admin',
        email: 'admin@example.com',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error uploading file', error: error.message }),
    };
  }
}
