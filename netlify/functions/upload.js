import fetch from 'node-fetch';


export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }

    try {
        const { fileName, fileContent } = JSON.parse(event.body);

        if (!fileName || !fileContent) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing fileName or fileContent' }),
            };
        }

        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const REPO_OWNER = 'YOUR_GITHUB_USERNAME';
        const REPO_NAME = 'YOUR_REPO_NAME';
        const COMMIT_MESSAGE = 'Upload file via Netlify Function';

        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fileName}`;
        const payload = {
            message: COMMIT_MESSAGE,
            content: fileContent
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error uploading file');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
}
