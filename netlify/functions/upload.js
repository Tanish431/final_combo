const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 
  const apiUrl = "https://api.github.com/repos/Tanish431/final_combo/contents/master.txt";

  const body = {
    message: "my commit message",
    committer: {
      name: "Tanish Soni",
      email: "tanishsoni431@gmail.com"
    },
    content: "bXkgbmV3IGZpbGUgY29udGVudHM="
  };

  try {
    const response = await fetch(apiUrl, {
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
        body: JSON.stringify({ error: "Error updating file in GitHub" }),
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
};
