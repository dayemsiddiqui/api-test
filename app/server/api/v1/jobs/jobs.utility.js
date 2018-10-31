const logger = require('../../../components/logger')
const TAG = '/api/v1/jobs/index.js'
const Job = require('./jobs.model')

exports.addJobsToDatabase = (userId, title, description, scheduleTime,
  webhook, customPayload, jobType, methodType, isActive = true) => {
  const job = new Job({
    userId,
    title,
    description,
    schedule_time: scheduleTime,
    webhook,
    custom_payload: customPayload,
    job_type: jobType,
    method_type: methodType,
    is_active: isActive,
    created_at: Date.now()
  })
  return job.save()
}

exports.getUserJobsFromDatabase = (userId) => {
  return Job.find({userId: userId}).exec()
}

exports.updateJobInDatabase = (jobId, data) => {
  return Job.findOneAndUpdate({_id: jobId}, data, {new: true}).exec()
}

exports.deleteJobInDatabase = (jobId) => {
  return Job.findOneAndDelete({_id: jobId}).exec()
}

exports.findOneJobInDatabase = (jobId) => {
  return Job.findOne({_id: jobId}).exec()
}
