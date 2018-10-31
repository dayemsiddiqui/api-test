const http = require('http')
const logger = require('./../components/logger')
const TAG = 'config/setup.js'

module.exports = function (app, config) {
  const server = http.createServer(app)
  // TODO: we will enable this while doing socket io
  const socket = require('socket.io').listen(server)

  server.listen(config.port, () => {
    logger.serverLog(TAG, `Scheduler Service STARTED on ${
      config.port} in ${config.env} mode`)
  })

  require('./socketio').setup(socket)

  if (config.env === 'production') {
    console.log('KiboPush server STARTED on %s in %s mode', config.port, config.env)
  }
}
