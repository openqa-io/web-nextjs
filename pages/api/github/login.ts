import {
  NextApiRequest,
  NextApiResponse
} from 'next-server/dist/lib/utils'

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify({ status: 'ok' }))
}
