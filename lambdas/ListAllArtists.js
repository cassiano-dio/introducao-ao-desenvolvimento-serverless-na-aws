const AWS = require("aws-sdk")

const listAllArtists = async (event) => {
    
    var responseBody = "";
    var statusCode = 0;
    
    const dynamodb = new AWS.DynamoDB.DocumentClient();
  
    
    try {
        
        const result = await dynamodb.scan({TableName:"Artist"}).promise()
        
        responseBody = JSON.stringify(result.Items)
        statusCode = 200
        
        
    } catch (e) {
        responseBody = JSON.stringify(e)
        statusCode = 400
    }
    
   const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true
        },
        body:responseBody
    };
    
    return response;
    
}


module.exports = {
    handler:listAllArtists
}
