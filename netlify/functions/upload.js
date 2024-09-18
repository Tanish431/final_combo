import fetch from 'node-fetch';

export async function handler(event) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const apiUrl = "https://api.github.com/repos/Tanish431/final_combo/contents/";
  const { fileName, content } = JSON.parse(event.body);
  const body = {
    message: `Upload ${fileName} to GitHub`,
    committer: {
      name: "Tanish Soni",
      email: "tanishsoni431@gmail.com"
    },
    content: content 
  };

  try {
    const response = await fetch(`${apiUrl}${fileName}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Error uploading file to GitHub" }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
}
