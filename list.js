import dynamoDb from './libs/dynamodb-lib'

export const main = async (event, context) => {
  const params = {
    TableName: process.env.TableName,
    KeyConditionExpression: 'userId=:userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  try {
    const result = await dynamoDb.query(params)

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(result.Items),
    }

    return response
  } catch (e) {
    console.log(e)
    const response = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ status: false }),
    }

    return response
  }
}
