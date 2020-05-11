import stripePackage from 'stripe'

const caluculateCost = (storage) => {
  const rate = storage <= 10 ? 4 : storage <= 100 ? 2 : 1

  return rate * storage * 100
}

export const main = async (event, context) => {
  const { storage, source } = JSON.parse(event.body)
  const amount = caluculateCost(storage)
  const description = 'Scratch Charge'

  const stripe = stripePackage(process.env.stripeSecretKey)

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: 'usd',
    })
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
