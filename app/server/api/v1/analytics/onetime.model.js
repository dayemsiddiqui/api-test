let mongoose = require('mongoose')
let Schema = mongoose.Schema

let onetimeAnalyticsSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'users'},
  totalJobCount: Number, // Total Jobs that were run from the queue (just one time)
  failedCount: Number,
  successCount: Number,
  activeJobs: Number, // One Time jobs count that are scheduled right now
  created_at: {type: Date, default: Date.now()},
  update_at: Date

})

module.exports = mongoose.model('onetimeAnalytics', onetimeAnalyticsSchema)
