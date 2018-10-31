let mongoose = require('mongoose')
let Schema = mongoose.Schema

let queueSchema = new Schema({
  // userId: {type: Schema.Types.ObjectId, ref: 'users'}, // Temporarily disabling it for testing
  userId: String,
  jobId: {type: Schema.Types.ObjectId, ref: 'jobs'},
  job_type: {
    type: String,
    enum: ['recurring', 'onetime']
  },
  method_type: {
    type: String,
    enum: ['GET', 'POST']
  },
  webhook: String,
  custom_payload: Schema.Types.Mixed,
  schedule_time: Date,
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
  response_time: String,
  created_at: {type: Date, default: Date.now()},
  update_at: Date

})

module.exports = mongoose.model('queues', queueSchema)
