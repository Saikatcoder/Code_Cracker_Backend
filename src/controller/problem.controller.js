import { db } from '../libs/db.js';

// createproblem controller for admin who can create problem
import {
  getJudge0LanguageId,submitBatch, pollBatchResults
} from "../libs/jdge0.libs.js";

export const createproblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  // going to check the user role once again

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      //
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----", result);
        // console.log(
        //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
        // );
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "Message Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.error("Error in createProblem:", error);
  return res.status(500).json({
    error: "Error While Creating Problem",
  });
  }
};



export const getAllProblems = async (req, res) => {
  try{
    const problems = await db.problem.findMany();

    if(!problems){
      return res.status(404).json({
        error: "no problem found"
      })
    }
    res.status(200).json({
      sucess: true,
      message: "Message fetched Successfully",
      problems

    })
  }catch{
    console.log(error);
    return res.status(500).json({
      error: "Error While Creating Problem",
    });
  }
};



export const getProblemById = async (req, res) => {
  const {id} = req.params;
  try {
    const problem = await db.problem.findUnique(
      {
        where:{
          id
        }
      }
    )
    if(!problem){
      return res.status(404).json({error:"Problem not found"})
    }
    return res.status(200).json({
      sucess: true,
      message: "Message Created Successfully",
      problem
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Creating Problem by id",
    });
  }
};

// update problem 
export const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = req.body;

    const problem = await db.problem.findUnique({ where: { id } });

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    if (req.user.role !== 'ADMIN') {
      return res
        .status(403)
        .json({ error: 'Forbidden: Only admin can update problems' });
    }

    // Step 1: Validate each reference solution using testCases
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Unsupported language: ${language}` });
      }

      const submissions = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      // console.log('Submissions:', submissions);

      // Step 2.3: Submit all test cases in one batch
      const submissionResults = await submitBatch(submissions);

      // Step 2.4: Extract tokens from response
      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      // Step 2.6: Validate that each test case passed (status.id === 3)
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Validation failed for ${language} on input: ${submissions[i].stdin}`,
            details: result,
          });
        }
      }
    }
    // Step 3. Update the problem in the database
    const updatedProblem = await db.problem.update({
      where: { id },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolutions,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Problem updated successfully',
      problem: updatedProblem,
    });
  } catch (error) {
    console.error('Error creating problem:', error);
    res.status(500).json({ error: 'Failed to update problem' });
  }
};


export const deleteProblem = async (req, res) => {
  const {id} = req.params;
  try {
    const problem  = await db.problem.findUnique({where:{id}});
    if(!problem){
    return res.status(404).json({error:"problem not found"})
  }

  await db.problem.delete({where:{id}})
  res.status(200).json({
    success:true,
    message:"problem deleted success true"
  })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'error white deleting the problem' })
  }
};

export const getAllProblemsSolvedByUser = async (req, res) => {};
