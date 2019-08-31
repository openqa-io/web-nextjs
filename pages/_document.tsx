import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const req = ctx.req
    let loggedIn = false
    let uid = ''
    let token = ''
    let avatar = ''

    if (req) {
      const cookie = req.headers.cookie
      const { oqa_uid, oqa_token } = cookie
    }

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
