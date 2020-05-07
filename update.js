import dynamoDb from './libs/dynamodb-lib'

export const main = async (event, context) => {
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.TableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':content': data.content || null,
      ':attachment': data.attachment || null
    },
    ReturnValues: 'ALL_NEW'
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  try {
    await dynamoDb.update(params)

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({status: true}),
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
