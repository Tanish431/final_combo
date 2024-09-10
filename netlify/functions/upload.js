export const handler = async (event) => {
  try {
    console.log("hi")
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "File upload failed", error: error.message }),
    };
  }
};
