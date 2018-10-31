const logger = require('../../../components/logger')
const TAG = '/api/v1/jobs/index.js'
const JobUtility = require('./jobs.utility')
const QueueUtility = require('./queue.utility')

exports.getJobs = function (req, res) {
  JobUtility
    .getUserJobsFromDatabase(req.user.id)
    .then((result) => res.status(200).json({status: 'success', payload: result}))
    .catch((err) => res.status(200).json({status: 'failed', description: 'Failed to get jobs', error: err}))
}

exports.createJob = function (req, res) {
  // Todo: Add Job To Queue
  JobUtility.addJobsToDatabase(
    (req.user && req.user.id) ? req.user.id : 'userId',
    req.body.title,
    (req.body.description) ? req.body.description : '',
    req.body.scheduleTime,
    req.body.webhook,
    req.body.customPayload,
    req.body.jobType,
    req.body.methodType
  )
    .then((job) => {
      QueueUtility
        .addJobObjectInQueue(job)
        .then(queue => res.status(200).json({status: 'success', payload: job}))
        .catch((err) => res.status(200).json({status: 'failed', description: 'Failed to add a job to queue', error: err}))
    })
    .catch((err) => res.status(200).json({status: 'failed', description: 'Failed to create a job', error: err}))
}

exports.updateJob = function (req, res) {
  JobUtility
    .updateJobInDatabase(req.params.jobId, req.body.updatedJob)
    .then((result) => res.status(200).json({status: 'success', payload: result}))
    .catch((err) => res.status(200).json({status: 'failed', description: 'Failed to updated a job', error: err}))
}

exports.deleteJob = function (req, res) {
  JobUtility
    .deleteJobInDatabase(req.params.jobId)
    .then((result) => res.status(200).json({status: 'success', payload: result}))
    .catch((err) => res.status(200).json({status: 'failed', description: 'Failed to delete a job', error: err}))
}

exports.getOneJob = function (req, res) {
  JobUtility
    .findOneJobInDatabase(req.params.jobId)
    .then((result) => res.status(200).json({status: 'success', payload: result}))
    .catch((err) => res.status(200).json({status: 'failed', description: 'Failed to get a job', error: err}))
}
