import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getAllSubmissions, getAllTheSubmissionsForProblem, getsubmissionsForProblem } from '../controller/submission.controller.js';

const submissionRoutes = express.Router();


submissionRoutes.get('/get-all-submissions', authMiddleware, getAllSubmissions);
submissionRoutes.get("/get-submission/:problemId",authMiddleware , getsubmissionsForProblem);
submissionRoutes.get("/get-submissions-count/:problemId", authMiddleware , getAllTheSubmissionsForProblem)

export default submissionRoutes;
