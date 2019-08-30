import {
  NextApiRequest,
  NextApiResponse
} from 'next-server/dist/lib/utils'

import Cors from 'micro-cors'
import fetch from 'isomorphic-unfetch'

import {
  githubGetTokenUrl,
  githubClientId
} from '../../../lib/constants'

const cors = Cors({
  allowMethods: ['GET', 'HEAD', 'POST'],
})

const server = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query)
  console.log(req.method)
  const { code } = req.query

  const tokens = await fetch(githubGetTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: githubClientId,
      client_secret: process.env.github_secret,
      code
    })
  })

  console.log("tokens is ", tokens)
  console.log(tokens.json())

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify({ status: 'ok' }))
}

export default cors(server)
