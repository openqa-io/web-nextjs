import React from 'react'

import withRedux from 'next-redux-wrapper'

import createStore from '../lib/store/root.store'
import { Provider } from "react-redux"
import { Store } from 'redux'

import { CookieNames } from '../lib/constants'
import { isServer } from '../lib/helpers/dom'
import App, { AppContext } from 'next/app'

import { NextPageContext } from 'next'
import cookies from 'next-cookies'

import * as actions from '../lib/actions/root.actions'
import fetch from 'isomorphic-unfetch'

interface Props extends AppContext {
  ctx: NextPageContext & { store: Store }
}

class MyApp extends App<any, any> {

  static async getInitialProps({ Component, ctx }: Props) {

    // we can dispatch from here too

    if (isServer()) { // isServer, validate login
      try {
        const cookiesFromReq = cookies(ctx)
        if (cookiesFromReq) {
          const loginInfo = JSON.parse(cookiesFromReq[CookieNames.OpenQA])
          const { uid, token } = loginInfo
          console.log(loginInfo)
          if (uid && token) {
            const r = await fetch('http://localhost:3000/api/user/info', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                uid,
                token
              })
            })
            const {
              github_uid,
              github_user_avatar
            } = await r.json()

            console.log(github_uid, github_user_avatar)

            if (github_uid) {
              ctx.store.dispatch(actions.setUserInfo({
                uid,
                token,
                githubName: github_uid,
                githubAvatar: github_user_avatar
              }))
            } else
              ctx.store.dispatch(actions.setUserInfo({
              }))
          } else
            ctx.store.dispatch(actions.setUserInfo({
            }))
        }
      } catch (e) {
        console.log(e)
      }
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
