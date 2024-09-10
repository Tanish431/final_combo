import axios from 'axios';

export const handler = async (event) => {
  try {
    // Get the file data from the event
    const fileData = event.body;

    // Make a request to the GitHub API to create a new file
    const response = await axios.put('https://api.github.com/repos/Tanish431/final_combo/contents/', {
      message: 'Upload file',
      content: fileData,
      // Add your GitHub access token for authentication
      headers: {
        Authorization: 'Bearer '+ process.env.GITHUB_TOKEN,
      },
    });

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully', data: response.data }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'File upload failed', error: error.message }),
    };
  }
};
