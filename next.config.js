const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')

const nextConfig = {
  webpack: (config, options) => {

    // modify the `config` here

    return {...config, ...{ "node": {
      "net": "empty",
      "dns": "empty"
    }}}
  }
}

module.exports = withPlugins(
  [[withSass]], nextConfig
)
