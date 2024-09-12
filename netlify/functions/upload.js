const axios = require('axios');

exports.handler = async (event) => {
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
        const REPO_OWNER = 'Tanish431';
        const REPO_NAME = 'final_combo';
        const COMMIT_MESSAGE = 'Upload file";

        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fileName}`;
        const payload = {
            message: COMMIT_MESSAGE,
            content: fileContent
        };

        const response = await axios.put(url, payload, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded successfully' }),
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
