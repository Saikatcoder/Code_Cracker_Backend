import { db } from '../libs/db.js';

// createproblem controller for admin who can create problem
export const createProblem = async (req, res) => {
  // going to get all the data from the request body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSoluctions,
  } = req.body;

  // check user role , its admin or not
  if (req.user.role !== 'ADMIN') {
    return res
      .status(403)
      .json({ error: 'you are not allowed to create a problem' });
  }

  //loop througth each and every soluction
  try {
    for (const [language, soluctionCode] of Object.entries(
      referenceSoluctions
    )) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      // all testcase sbmissiom redy , for judge0
      const submissions = testcases.map(({ input, output }) => ({
        source_code: soluctionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await poolBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result..",result);
        if (result.status.id !== 3) {
          return res
            .status(400)
            .json({
              error: `Testcse ${i + 1} failed for language ${language}`,
            });
        }
      }

      // save the problem to the databse
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
          referenceSoluctions,
          userId: req.user.id,
        },
      });

      return res.status(201).json(newProblem);
    }
  } catch (error) {

  }
};

export const getAllProblems = async (req, res) => {

};

export const getProblemById = async (req, res) => {};

export const updateProblem = async (req, res) => {};

export const deleteProblem = async (req, res) => {};

export const getAllProblemsSolvedByUser = async (req, res) => {};
