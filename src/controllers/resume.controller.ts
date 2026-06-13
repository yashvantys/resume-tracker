import { FastifyRequest, FastifyReply } from "fastify";
import {
  processResume,
  getResumeById,
  matchResumeWithJob,
} from "../services/resume.service";

export const uploadResume = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const file = await request.file();
    if (!file) {
      return reply.status(400).send({
        message: "File required",
      });
    }
    request.log.info(
      {
        requestId: request.id,
        fileName: file.filename,
      },
      "Resume upload started",
    );
    const analysis = await processResume(file);
    return reply.send({
      analysis,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return reply.status(500).send({
      message: "Failed to upload resume",
    });
  }
};
export const getResumeAnalysisById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const analysis = await getResumeById(id);
    return reply.send(analysis);
  } catch (error) {
    console.error("Error getting resume analysis:", error);
    return reply.status(500).send({
      message: "Failed to get resume analysis",
    });
  }
};

export const matchResumes = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { resumeId, jobDescription } = request.body as {
      resumeId: string;
      jobDescription: string;
    };

    const result = await matchResumeWithJob(resumeId, jobDescription);

    return reply.send(result);
  } catch (error) {
    console.error("Error matching resumes:", error);
    return reply.status(500).send({
      message: "Failed to match resumes",
    });
  }
};
