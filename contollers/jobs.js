const Jobs = require('../models/jobs');
const { StatusCodes } = require('http-status-codes');
const { resouceNotFound } = require('../errors')

//get all jobs
exports.getAllJobs = async(req, res) => {
        const allJobs = await Jobs.find({ createdBy: req.user.id });
        if (allJobs.length > 0) {
            return res.status(StatusCodes.OK).json(allJobs)
        }
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'jobs not found' });


    }
    //get single job
exports.getJob = async(req, res) => {
    const jobId = req.params.id;
    const singleJob = await Jobs.find({ _id: jobId, createdBy: req.user.id });
    if (singleJob.length > 0) {
        return res.status(StatusCodes.OK).json(singleJob)
    }
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'job not found' })


}

//create job
exports.createJob = async(req, res) => {
    //data from req body
    req.body.createdBy = req.user.id;
    const job = await Jobs.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

//update job
exports.updateJob = async(req, res) => {
    res.send('all jobs');
}

//delete job
exports.deleteJob = async(req, res) => {
    res.send('delete  job');
}