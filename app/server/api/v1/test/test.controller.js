const logger = require('../../../components/logger')
const TAG = '/api/v1/test/index.js'
// const Test = require('./tests.model')
exports.index = function (req, res) {
  console.log('endpoint is hit')
  // const test = new Test({
  //   testPayload: 'API Endpoint Called'
  // })

  // test
  //   .save()
  //   .then(result => res.status(200).json({status: 'success', payload: 'Hello World', response: result}))
  //   .catch(err => res.status(200).json({status: 'success', payload: 'Hello World', error: err}))
  return res.status(200).json({status: 'success', payload: 'Hello World'}) 
}
