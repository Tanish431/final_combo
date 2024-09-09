import { Octokit } from '@octokit/rest';  
exports.handler = async function (event) {
  try {
    const form = event.body;
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    const fileContent = Buffer.from(form).toString('base64');
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: 'Tanish431',  // GitHub username
      repo: 'final_combo',  // GitHub repo name
      path: 'path/to/grade-table.xlsx', // File path in your GitHub repo
      message: 'Uploading new grade table',
      content: fileContent,
      committer: {
        name: 'Tanish Soni',
        email: 'tanishsoni431@gmail.com',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'File upload failed!', error: error.message }),
    };
  }
};
