const logger = require('./logger')
const TAG = 'components/utility.js'
const config = require('./../config/environment')
const axios = require('axios')

logger.serverLog(TAG, 'Server UtilityJS Called: ')

function validateUrl (str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  if (regexp.test(str)) {
    return true
  } else {
    return false
  }
}

// Following function will be used to make get requests to whatsapp
let header = {
  'headers': {'Authorization': 'Bearer ' + config.docker_token, 'Content-Type': 'application/json'}
}

function getFromWhatsapp (endpoint, cb) {
  axios.get(config.docker_url + endpoint)
    .then(resp => {
      cb(null, resp)
    })
    .catch(err => {
      cb(err, null)
    })
}

function deleteFromWhatsapp (endpoint, cb) {
  axios.delete(config.docker_url + endpoint)
    .then(resp => {
      cb(null, resp)
    })
    .catch(err => {
      cb(err, null)
    })
}

function postToWhatsapp (endpoint, params, cb) {
  axios.post(config.docker_url + endpoint, params)
    .then(resp => {
      cb(null, resp)
    })
    .catch(err => {
      cb(err, null)
    })
}

function postToWhatsappHeaders (endpoint, params, headers, cb) {
  axios.post(config.docker_url + endpoint, params, {
    headers: headers
  })
    .then(resp => {
      cb(null, resp)
    })
    .catch(err => {
      cb(err, null)
    })
}

function putToWhatsapp (endpoint, params, cb) {
  axios.put(config.docker_url + endpoint, params)
    .then(resp => {
      cb(null, resp)
    })
    .catch(err => {
      cb(err, null)
    })
}

exports.validateUrl = validateUrl
exports.getFromWhatsapp = getFromWhatsapp
exports.deleteFromWhatsapp = deleteFromWhatsapp
exports.postToWhatsapp = postToWhatsapp
exports.postToWhatsappHeaders = postToWhatsappHeaders
exports.putToWhatsapp = putToWhatsapp
