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
