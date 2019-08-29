import {
  NextApiRequest,
  NextApiResponse
} from 'next-server/dist/lib/utils'

import Cors from 'micro-cors'

const cors = Cors({
  allowMethods: ['GET', 'HEAD', 'POST'],
})

const server = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query)
  console.log(req.method)
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify({ status: 'ok' }))
}

export default cors(server)
