import { MultipartFile } from "@fastify/multipart";
import { extractTextFromPdf } from "./pdf.service";
import { analyzeResume } from "./openai.service";

export const processResume = async (file: MultipartFile) => {
  try {
    const buffer = await file.toBuffer();
    const resumeText = await extractTextFromPdf(buffer);
    const analysis = await analyzeResume(resumeText);
    return JSON.parse(analysis ?? "{}");
  } catch (error) {
    console.error("Error processing resume:", error);
    throw new Error("Failed to process resume");
  }
};
