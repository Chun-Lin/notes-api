import dynamoDb from './libs/dynamodb-lib'

export const main = async (event, context) => {
  const params = {
    TableName: process.env.TableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  try {
    await dynamoDb.delete(params)

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ status: true }),
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
