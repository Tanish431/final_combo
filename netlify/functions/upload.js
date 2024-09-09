import { IncomingForm } from 'formidable';
import fs from 'fs';
import { Octokit } from '@octokit/rest';

export const handler = async (event) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(event, (err, fields, files) => {
      if (err) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ message: 'File parsing failed', error: err.message }),
        });
        return;
      }

      // Get the uploaded file (excel file in this case)
      const uploadedFile = files.gradeFile;

      if (uploadedFile) {
        // Read the file content
        const fileContent = fs.readFileSync(uploadedFile.path);

        // Convert file content to base64
        const contentBase64 = Buffer.from(fileContent).toString('base64');

        // Upload to GitHub
        const octokit = new Octokit({
          auth: process.env.GITHUB_TOKEN, // Ensure you have set the GitHub token as an environment variable
        });

        const fileName = uploadedFile.name; // This will be the name of the file in your GitHub repo

        octokit.repos.createOrUpdateFileContents({
          owner: 'Tanish431',
          repo: 'final_combo',
          path: `path/to/upload/${fileName}`,  // Define the path where you want to save the file
          message: 'Upload Excel file from Netlify function',
          content: contentBase64,  // File content in base64
          committer: {
            name: 'Tanish Soni',
            email: 'tanishsoni431@gmail.com',
          },
          author: {
            name: 'Tanish Soni',
            email: 'tanishsoni431@gmail.com',
          },
        })
        .then(() => {
          resolve({
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded to GitHub successfully!' }),
          });
        })
        .catch((error) => {
          reject({
            statusCode: 500,
            body: JSON.stringify({ message: 'GitHub upload failed', error: error.message }),
          });
        });
      } else {
        reject({
          statusCode: 400,
          body: JSON.stringify({ message: 'No file uploaded' }),
        });
      }
    });
  });
};

