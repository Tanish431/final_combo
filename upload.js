exports.handler = async (event) => {  
    const file = event.body.gradeFile;  
    const storage = await netlify.storage();  
    
    try {  
     const fileUrl = await storage.put(file);  
     return {  
      statusCode: 201,  
      body: JSON.stringify({ message: 'File uploaded successfully!' }),  
     };  
    } catch (error) {  
     return {  
      statusCode: 500,  
      body: JSON.stringify({ message: 'Error uploading file: ' + error.message }),  
     };  
    }  
  };
  