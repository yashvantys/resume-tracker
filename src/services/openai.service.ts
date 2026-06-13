import OpenAI from "openai";
require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function analyzeResume(resumeText: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
            Return ONLY valid JSON:

            {
            "atsScore": number,
            "skills": [],
            "strengths": [],
            "missingSkills": [],
            "recommendations": []
            }

            Resume:

            ${resumeText}
            `,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume");
  }
}

export async function analyzeMatchedJobDescription(
  skills: string[],
  jobDescription: string,
) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
          You are an ATS Resume Matching System.

          Compare the candidate resume with the job description.

          Instructions:
          - Calculate a realistic match percentage between 0 and 100.
          - Match equivalent technologies:
            - Node.js = NodeJS
            - JavaScript = JS
            - TypeScript = TS
            - PostgreSQL = Postgres
            - MongoDB = Mongo
          - Do not penalize minor naming differences.
          - Include only genuinely missing skills.
          - Provide actionable recommendations.

          Return ONLY valid JSON.
          Do not include markdown.
          Do not wrap the response in \`\`\`json.

          {
            "matchPercentage": number,
            "matchedSkills": [],
            "missingSkills": [],
            "recommendations": []
          }

          Resume Skills:
          ${skills.join(", ")}

          Job Description:
          ${jobDescription}
          `,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing job description:", error);
    throw new Error("Failed to analyze job description");
  }
}
