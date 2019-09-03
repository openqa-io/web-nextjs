import React from 'react'

import withRedux from 'next-redux-wrapper'

import createStore from '../lib/store/root.store'
import { Provider } from "react-redux"
import { Store } from 'redux'

import { isServer } from '../lib/helpers/dom'
import App, { AppContext } from 'next/app'

import { NextPageContext } from 'next'
import cookies from 'next-cookies'

interface Props extends AppContext {
  ctx: NextPageContext & { store: Store }
}

class MyApp extends App<any, any> {

  static async getInitialProps({ Component, ctx }: Props) {

    // we can dispatch from here too
    const oqaCookies = cookies(ctx)
    console.log('cookies are: ', oqaCookies)
    /* if (isServer) {
     *   import('../lib/db').then(({ getGithubUserInfo }: any) => {
     *     ctx.store.dispatch({ type: 'FOO', payload: 'foo' })
     *   })

     * }
     */
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { pageProps }

  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }

}

export default withRedux(createStore)(MyApp)
