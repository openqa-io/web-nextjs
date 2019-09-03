import React from 'react'

import withRedux from 'next-redux-wrapper'

import createStore from '../lib/store/root.store'
import { Provider } from "react-redux"
import { Store } from 'redux'

import App, { AppContext } from 'next/app'

import { NextPageContext } from 'next'
import Cookies from 'js-cookie'

import * as actions from '../lib/actions/root.actions'
import { isServer } from '../lib/helpers/dom'
import { CookieNames } from '../lib/constants'

interface Props extends AppContext {
  ctx: NextPageContext & { store: Store }
}

class MyApp extends App<any, any> {

  static async getInitialProps({ Component, ctx }: Props) {

    if (!isServer()) {
      const openQaCookie = Cookies.get(CookieNames.OpenQA)
      const { uid, token, githubName } = openQaCookie ? JSON.parse(openQaCookie) : { uid: '', token: '', githubName: '' }

      console.log('cookies are ', openQaCookie, githubName, uid, token)

      if (uid && token)
        ctx.store.dispatch(actions.setUserInfo({
          uid,
          token,
          githubName
        }))

    }
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
