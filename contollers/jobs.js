//get all jobs
exports.getAllJobs = async(req, res) => {
        res.send('all jobs');
    }
    //get single job
exports.getJob = async(req, res) => {
    res.send('get a single job');
}

//create job
exports.createJob = async(req, res) => {
    res.json({ user: req.user });
}

//update job
exports.updateJob = async(req, res) => {
    res.send('all jobs');
}

//delete job
exports.deleteJob = async(req, res) => {
    res.send('delete  job');
}