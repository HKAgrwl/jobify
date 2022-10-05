import express from 'express';

import {createJob,updateJob,getAllJobs,showStats,deleteJob} from '../controllers/jobsController.js'

const router = express.Router();

router.route('/').post(createJob).get(getAllJobs)
// remember about /:id 
router.route('/stats').post(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router;