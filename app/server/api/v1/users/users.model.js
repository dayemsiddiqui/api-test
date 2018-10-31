let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  email: String,
  name: String,
  company_name: String,
  password: String,
  plan: {
    type: String,
    enum: ['free', 'basic', 'enterprise']
  }
})

module.exports = mongoose.model('users', userSchema)
