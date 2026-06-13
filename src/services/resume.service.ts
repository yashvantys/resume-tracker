import { MultipartFile } from "@fastify/multipart";
import { extractTextFromPdf } from "./pdf.service";
import { analyzeMatchedJobDescription, analyzeResume } from "./openai.service";
import { v4 as uuidv4 } from "uuid";
import {
  saveResumeAnalysis,
  getResumeAnalysisById,
} from "../repositories/resume.repository";

export const processResume = async (file: MultipartFile) => {
  try {
    const buffer = await file.toBuffer();
    const resumeText = await extractTextFromPdf(buffer);
    const analysis = await analyzeResume(resumeText);

    const cleanedAnalysis = analysis
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedAnalysis = JSON.parse(cleanedAnalysis ?? "{}");
    await saveResumeAnalysis(
      uuidv4(),
      file.filename,
      parsedAnalysis.atsScore,
      parsedAnalysis,
    );
    return parsedAnalysis;
  } catch (error) {
    console.error("Error processing resume:", error);
    throw new Error("Failed to process resume");
  }
};

export const getResumeById = async (id: string) => {
  try {
    const analysis = await getResumeAnalysisById(id);
    return analysis;
  } catch (error) {
    console.error("Error getting resume analysis:", error);
    throw new Error("Failed to get resume analysis");
  }
};

export const matchResumeWithJob = async (
  resumeId: string,
  jobDescription: string,
) => {
  try {
    const resumeAnalysis = await getResumeById(resumeId);
    if (!resumeAnalysis) {
      throw new Error("Resume not found");
    }
    const resumeData = resumeAnalysis.analysis;
    const response = await analyzeMatchedJobDescription(
      resumeData,
      jobDescription,
    );
    return response;
  } catch (error) {
    console.error("Error matching resumes:", error);
    throw new Error("Failed to match resumes");
  }
};
