const AWS = require('aws-sdk');

exports.handler = async (event) => {

    
    const ddb = new AWS.DynamoDB.DocumentClient();

    const {id,name} = event.pathParameters;
    const {age} = JSON.parse(event.body);

    var data;

    var statusCode = 0;

    const params = {
        TableName:'Artist',
        Key: {
            id : id,
            name: name
        },
        UpdateExpression: 'set age = :age',
        ExpressionAttributeValues: {
            ":age": age
        }
    
    };

    try {

        await ddb.update(params).promise();
        data = "Update succeeded"
        statusCode = 200

    } catch (err) { 

        data = err;
        statusCode = 400
    }

    const response = {
        'statusCode': statusCode,
        'body': JSON.stringify({
            message: data
        })
    };

    return response;

};
