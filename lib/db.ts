import { Pool } from 'pg'
import uuidv4 from 'uuid/v4'
import jsSHA from 'jssha'

if (!process.env.PG_STRING)
  throw 'db connection string not provided through environment variable'

const pool = new Pool({
  connectionString: process.env.PG_STRING
})

interface GithubUser {
  login: String
  avatar_uri?: String
  email?: String
}

interface GithubLoginResult {
  uid: String
  token: String
}

const githubLogin = async (user: GithubUser) => {
  const client = await pool.connect()
  const { login, avatar_uri, email } = user
  try {
    let uid = uuidv4()
    const shaObj = new jsSHA('SHA-256', 'TEXT')
    shaObj.update(uuidv4())
    const token = shaObj.getHash('HEX')
    await client.query('BEGIN')
    const update = {
      text: 'update users set github_user_avatar = $1, github_user_email = $2, login_token = $3 where github_uid = $4 returning uid',
      values: [avatar_uri, email, token, login]
    }
    const updateResult = await client.query(update)

    if (!updateResult || updateResult.rowCount === 0) { // a new user. create user...
      const insert = {
        text: 'insert into users(uid, github_uid, github_user_avatar, github_user_email, login_token) Values ($1, $2, $3, $4, $5) Returning uid',
        values: [uid, login, avatar_uri, email, token]
      }
      const insertResult = await client.query(insert)
      if (!insertResult || insertResult.rowCount === 0)
        uid = ''
    } else
      uid = updateResult.rows[0].uid

    await client.query('COMMIT')
    return {
      uid,
      token
    } as GithubLoginResult
  } catch (e) {
    console.log(e)
    await client.query('ROLLBACK')
    return {
      uid: '',
      token: ''
    } as GithubLoginResult
  } finally {
    client.release()
  }

}

const getGithubUserInfo = async (uid: String, token: String) => {

  const client = await pool.connect()
  try {

    const query = {
      text: 'select github_uid, github_user_avatar from users where uid = $1 And login_token = $2',
      values: [uid, token]
    }
    const result = await client.query(query)

    if (!result || result.rowCount === 0) { // a new user. create user...
      return {
        github_uid: '',
        github_user_avatar: ''
      }
    } else {
      const { github_uid, github_user_avatar } = result.rows[0]
      return {
        github_uid,
        github_user_avatar
      }
    }

  } catch (e) {
    console.log(e)
    return {
      github_uid: '',
      github_user_avatar: ''
    }
  } finally {
    client.release()
  }

}

export { githubLogin, getGithubUserInfo }
