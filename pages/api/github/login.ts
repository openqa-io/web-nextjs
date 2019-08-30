import {
  NextApiRequest,
  NextApiResponse
} from 'next-server/dist/lib/utils'

import Cors from 'micro-cors'
import fetch from 'isomorphic-unfetch'

import {
  githubGetTokenUrl,
  githubClientId,
  githubGetUserInfoUrl
} from '../../../lib/constants'

const cors = Cors({
  allowMethods: ['GET', 'HEAD', 'POST'],
})

const server = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query)
  console.log(req.method)
  const { code } = req.query

  try {
    const r = await fetch(githubGetTokenUrl, {
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
    const body = await r.json()

    const { access_token } = body
    if (access_token) {
      const r = await fetch(githubGetUserInfoUrl, {
        headers: {
          'Authorization': `token ${access_token}`
        }
      })
      const body = await r.json()
      res.setHeader('Authorization', `token ${}`)
      res.statusCode = 200
      res.end(JSON.stringify(body))
    } else
      throw "Github oauth error"
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end("Internal server error")
  }
}

export default cors(server)
