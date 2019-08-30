const githubClientId = 'f4d72fd21cf50d0b8a6d'
const githubRedirectUrl = 'http://dev.mashixiong.com/api/github/login'
const githubScope = 'read:user user:email'
const githubState = '39480398aldkjfnc8378djfienb123'

const githubAuthUrl = encodeURI(`https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_url=${githubRedirectUrl}&scope=${githubScope}&state=${githubState}`)

const githubGetTokenUrl = 'https://github.com/login/oauth/access_token'

export {
  githubClientId,
  githubAuthUrl,
  githubGetTokenUrl
}
