const path = require('path')
const _ = require('lodash')

const all = {
  env: process.env.NODE_ENV,

  secrets: {
    session: process.env.SESSION_SECRET || 'some string'
  },

  // Project root path
  root: path.normalize(`${__dirname}/../../..`),

  // Server port
  port: process.env.PORT || 8000,

  ip: process.env.IP || undefined,

  domain: `${process.env.DOMAIN || 'https://easyscheduler.com'}`,

  docker_url: process.env.docker_ip || 'http://localhost:9090',
  docker_token: process.env.docker_token || undefined,
  // Mongo Options
  mongo: {
    options: {
      db: {
        safe: true
      }
    },
    uri: 'mongodb://localhost:27017/scheduler'
  }
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {})
