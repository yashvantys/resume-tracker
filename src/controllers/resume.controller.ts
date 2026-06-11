import { FastifyRequest, FastifyReply } from "fastify";
import { processResume } from "../services/resume.service";

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

    const analysis = await processResume(file);
    return {
      analysis,
    };
  } catch (error) {
    console.error("Error uploading resume:", error);
    return reply.status(500).send({
      message: "Failed to upload resume",
    });
  }
};
