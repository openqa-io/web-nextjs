import {
  NextApiRequest,
  NextApiResponse
} from 'next-server/dist/lib/utils'

import Cors from 'micro-cors'

import { getGithubUserInfo } from '../../../lib/db'

const cors = Cors({
  allowMethods: ['GET', 'HEAD', 'POST'],
})

const server = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    console.log('user infor request body is: ', req.body)
    const { uid, token } = req.body

    if (uid && token) {

      const userInfo = await getGithubUserInfo(uid, token)

      console.log('user infor fetched is', userInfo)
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify(userInfo))
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify({}))
    }

  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end("Internal server error")
  }
}

export default cors(server)
