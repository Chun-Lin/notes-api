import uuid from 'uuid'
import dynamoDb from './libs/dynamodb-lib'

export const main = async (event, context) => {
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.TableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  try {
    await dynamoDb.put(params)
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item),
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
