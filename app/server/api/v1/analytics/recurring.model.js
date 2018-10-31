let mongoose = require('mongoose')
let Schema = mongoose.Schema

let recurringAnalytcisSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'users'},
  jobId: {type: Schema.Types.ObjectId, ref: 'jobs'},
  successCount: Number,
  failedCount: Number,
  created_at: {type: Date, default: Date.now()},
  update_at: Date
})

module.exports = mongoose.model('recurringAnalytics', recurringAnalytcisSchema)
