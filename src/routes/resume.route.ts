import { FastifyPluginAsync } from "fastify";
import {
  uploadResume,
  getResumeAnalysisById,
  matchResumes,
} from "../controllers/resume.controller";

const resumeRoutes: FastifyPluginAsync = async (app) => {
  app.post("/upload", uploadResume);
  app.get("/:id", getResumeAnalysisById);
  app.post("/match", matchResumes);
};
export default resumeRoutes;
