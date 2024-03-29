import Job from '../models/Job.js'
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../errors/index.js";
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';

const createJob = async (req, res) => {
    const { position, company } = req.body
    if (!position || !company) {
        throw new BadRequestError()
    }
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
    res.send('create job')
}
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })
    res.
        status(StatusCodes.OK)
        .json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}
const updateJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { company, position, status } = req.body;

    if (!position || !company) {
        throw new BadRequestError('Please provide all values');
    }
    const job = await Job.findOne({ _id: jobId });

    if (!job) {
        throw new NotFoundError(`No job with id :${jobId}`);
    }

    checkPermissions(req.user, job.createdBy);

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(StatusCodes.OK).json({ updatedJob });

}
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params
    const job = await Job.findOne({ id: jobId })

    if (!job) {
        throw new NotFoundError(`No job with id : ${jobId}`)
    }

    checkPermissions(req.user, job.createdBy)

    await job.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}
const showStats = async (req, res) => {
    const showStats = async (req, res) => {
        let stats = await Job.aggregate([
          { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
      
        res.status(StatusCodes.OK).json({ stats });
    };
}

export { createJob, updateJob, getAllJobs, deleteJob, showStats };