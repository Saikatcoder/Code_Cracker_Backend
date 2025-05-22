import { db } from "../libs/db.js";

export const getAllSubmissions = async (req, res)=>{
    try {
        const userId = req.user.id;
        const submission = await db.submission.findMany({
            where:{
                userId:userId
            }
        })
        res.status(200).json({
            success:true,
            message:"Submissions fetched successfully",
            submission
        })

    } catch (error) {
        console.error("fetch submission Error:", error);
        res.status(500).json({error:"failed to fetch submissions"})
    }
}

export const getsubmissionsForProblem = async (req, res)=>{
    try {
        const userId = req.user.id;
        const problemId = req.param.problemId;
        const submissions = await db.submission.findMany({
            where:{
                userId:userId,
                problemId:problemId
            }
        })

        req.status(200).json({
            success:true,
            message:"submission fetched successfully",
            submissions
        })
    } catch (error) {
         console.error("fetch submission Error:", error);
        res.status(500).json({error:"failed to fetch submissions"})
    }
}

export const getAllTheSubmissionsForProblem = async (req, res)=>{
    try {
        const problemId = req.params.problemId;
        const submission = await db.submission.count({
            where:{
                problemId:problemId
            }
        })
        res.status(200).json({
            success:true,
            message:"Submissions Fetched successfully",
            count:submission
        })
    } catch (error) {
          console.error("fetch submission Error:", error);
        res.status(500).json({error:"failed to fetch submissions"})
    }
}

