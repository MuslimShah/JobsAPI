const Jobs = require('../models/jobs');
const { StatusCodes } = require('http-status-codes');
const { resouceNotFound, BadRequest } = require('../errors')

//get all jobs
exports.getAllJobs = async(req, res) => {
        const allJobs = await Jobs.find({ createdBy: req.user.id }).sort('createdAt');
        if (allJobs.length === 0) {
            throw new resouceNotFound(`oops! no job found`)
        }

        res.status(StatusCodes.OK).json({ jobs: allJobs, count: allJobs.length })


    }
    //get single job
exports.getJob = async(req, res) => {
    const jobId = req.params.id;
    const singleJob = await Jobs.findOne({ _id: jobId, createdBy: req.user.id });
    if (!singleJob) {
        throw new resouceNotFound(`oops! no job found  with id:${jobId} `)
    }
    res.status(StatusCodes.OK).json(singleJob)


}

//create job
exports.createJob = async(req, res) => {
    //data from req body
    req.body.createdBy = req.user.id;
    const job = await Jobs.create(req.body);
    res.status(StatusCodes.CREATED).json({ job, msg: "job created successfully" });
}

//update job
exports.updateJob = async(req, res) => {
    //extracting userid and jobid from the request object
    const {
        user: { id: userId },
        params: { id: jobId },
        body: { company, position }

    } = req;

    if (company === '' || position === '') {
        throw new BadRequest('provide valid company or positon')
    }
    const job = await Jobs.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { runValidators: true, new: true });
    if (!job) {
        throw new resouceNotFound(`job not found with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job, msg: 'job updated successfully' })

}

//delete job
exports.deleteJob = async(req, res) => {
    //extracting userid and jobid from the request object
    const { user: { id: userId }, params: { id: jobId } } = req;

    const job = await Jobs.findOneAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new resouceNotFound(`oops! no job found  with id:${jobId} `)
    }
    res.status(StatusCodes.OK).json({ msg: `job with id:${jobId} deleted successfully` })
}