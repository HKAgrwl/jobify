import express from 'express';

import {createJob,updateJob,getAllJobs,showStats,deleteJob} from '../controllers/jobsController.js'

const router = express.Router();

router.route('/stats').get(showStats)
router.route('/').post(createJob).get(getAllJobs)
// remember about /:id 

router.route('/:id').patch(updateJob)
router.route('/:id').delete(deleteJob)

export default router;