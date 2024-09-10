const axios = require('axios');

exports.handler = async (event) => {
  try {
    // Get the file data from the event
    const fileData = event.body;

    // Make a request to the GitHub API to create a new file
    const response = await axios.put('https://api.github.com/repos/{owner}/{repo}/contents/{path}', {
      message: 'Upload file',
      content: fileData,
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