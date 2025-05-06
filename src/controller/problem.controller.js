import { db } from "../libs/db.js"

// createproblem controller for admin who can create problem
export const createProblem = async (req, res)=>{
    // going to get all the data from the request body
    const {title ,  description, difficulty, tags, examples, constraints, testcases,  codeSnippets, referenceSoluctions} =  req.body;
    
    // check user role , its admin or not
    if(!req.user.role !== "ADMIN"){
      return  res.status(403).json({error:"you are not allowed to create a problem"})
    }


    //loop througth each and every soluction
   try {
    for(const [language, soluctionCode] of Object.entries(referenceSoluctions)){
        const languageId = getJudge0LanguageId(language)
        if(!languageId){
            return res.status(400).json({error:`Language ${language} is not supported`})
        }   

        // all testcase sbmissiom redy , for judge0
        const submissions =testcases.map(({input, output})=>({
            source_code: soluctionCode,
            language_id : languageId,
            stdin :input,
            expected_output:output,

        }))
        const submissionResults = await submitBatch(submissions)
    }

   } catch (error) {
    
   }
}


export const getAllProblems = async (req, res)=> {}

export const getProblemById = async (req, res)=> {}

export const updateProblem = async (req, res)=> {}


export const deleteProblem = async (req, res)=> {}


export const getAllProblemsSolvedByUser = async (req, res)=> {}