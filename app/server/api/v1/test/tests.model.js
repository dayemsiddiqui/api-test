let mongoose = require('mongoose')
let Schema = mongoose.Schema

let testSchema = new Schema({
  testPayload: String
})

module.exports = mongoose.model('tests', testSchema)