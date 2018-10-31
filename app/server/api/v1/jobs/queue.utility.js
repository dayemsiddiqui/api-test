const logger = require('../../../components/logger')
const TAG = '/api/v1/queue/index.js'
const Queue = require('./queue.model')

exports.addJobInQueue = () => {
  // Take queue fields as params
}

// Returns a promise
exports.addJobObjectInQueue = (job) => {
  const data = {
    userId: job.userId,
    jobId: job._id,
    job_type: job.job_type,
    method_type: job.method_type,
    webhook: job.webhook,
    custom_payload: job.custom_payload,
    schedule_time: job.schedule_time,
    status: 'pending'
  }

  const queue = new Queue(data)
  return queue.save()
}

exports.removeJobInQueue = (jobId) => {

}

exports.updateJobInQueue = (jobId, data) => {

}

exports.computeNextRecurringJob = () => {
  // Takes a JobInQueue

  // Returns a JobInQueue
}
