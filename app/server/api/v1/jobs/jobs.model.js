let mongoose = require('mongoose')
let Schema = mongoose.Schema

let jobSchema = new Schema({
  // userId: {type: Schema.Types.ObjectId, ref: 'users'}, // Temporarily disabling it for testing
  userId: String,
  title: String,
  description: String,
  schedule_time: Schema.Types.Mixed,
  webhook: String,
  custom_payload: Schema.Types.Mixed,
  job_type: {
    type: String,
    enum: ['recurring', 'onetime']
  },
  method_type: {
    type: String,
    enum: ['GET', 'POST']
  },
  is_active: {type: Boolean, default: true},
  created_at: {type: Date, default: Date.now()},
  update_at: Date
})

module.exports = mongoose.model('jobs', jobSchema)
