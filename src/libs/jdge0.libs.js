import axios from "axios";

// 1. Get Judge0 language ID
export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return languageMap[language.toUpperCase()];
};

// 2. Sleep function (corrected: capital "P" in Promise)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 3. Polling results for batch tokens
export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const results = data.submissions;

    const isAllDone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2
    );

    if (isAllDone) return results;
    await sleep(1000);
  }
};

// 4. Submit batch to Judge0
export const submitBatch = async (submissions) => {
  // Optional: Validate submissions
  submissions.forEach((sub, index) => {
    if (
      !sub.source_code ||
      !sub.language_id ||
      sub.stdin === undefined ||
      sub.expected_output === undefined
    ) {
      throw new Error(
        `Invalid submission at index ${index}: Missing required fields`
      );
    }
  });

  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    { submissions },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Submission Results:", data);
  return data; // [{token}, {token}]
};

// 5. Map language ID to name
export function getLanguageName(languageId) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
  };

  return LANGUAGE_NAMES[languageId] || "Unknown";
}



