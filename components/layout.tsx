import Head from 'next/head'
import Link from 'next/link'

import Cookies from 'js-cookie'

import { githubAuthUrl, CookieNames } from '../lib/constants'
import '../styles/styles.sass'

import { useState } from 'react'

export default ({ children }: any) => {
  /*
   * Added this to toggle the is-active class. See:
   *
   * https://bulma.io/documentation/components/navbar/#navbar-menu
   * https://github.com/jgthms/bulma/issues/856
   */
  const toggleStyles = () => {
    document.querySelector('#burger').classList.toggle('is-active')
    document.querySelector('#navbarmenu').classList.toggle('is-active')
  }

  const [githubName, setGithubName] = useState<String | undefined>(Cookies.get(CookieNames.GithubId))
  const uid = Cookies.get(CookieNames.Uid)
  const token = Cookies.get(CookieNames.LoginToken)
  console.log('cookies are ', Cookies.get(), githubName, uid, token)
  return (
    <div>
      <Head>
        <title>jvarness</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className="container">
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item">
                <img src="/static/images/OpenQA-horizontal-530x130.png" />
              </a>
              <a id="burger" onClick={toggleStyles}
                role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarmenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="navbarmenu" className="navbar-menu">
              <div className="navbar-start">
                <Link prefetch href="/">
                  <a className="navbar-item">Home</a>
                </Link>
                <Link prefetch href="/doc">
                  <a className="navbar-item">Doc</a>
                </Link>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    {
                      !githubName ?
                        <>
                          <a href={githubAuthUrl} className="button is-white">Sign up</a>
                          <a href={githubAuthUrl} className="button is-info">Sign In</a>
                        </> :
                        <>
                          <a className="button is-white">{githubName}</a>
                          <a onClick={() => {
                            Cookies.remove(CookieNames.GithubId)
                            Cookies.remove(CookieNames.Uid)
                            Cookies.remove(CookieNames.LoginToken)
                            setGithubName('')
                          }} className="button is-primary">Sign Out</a>
                        </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="content has-text-centered">
          <span>I'm the footer</span>
        </div>
      </footer>
    </div>
  )
}
