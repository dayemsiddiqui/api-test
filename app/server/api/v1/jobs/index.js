const express = require('express')
const router = express.Router()

const controller = require('./jobs.controller')

router.get('/', controller.getJobs)
router.get('/:jobId', controller.getOneJob)
router.post('/', controller.createJob)
router.put('/:jobId', controller.updateJob)
router.delete('/:jobId', controller.deleteJob)

module.exports = router
