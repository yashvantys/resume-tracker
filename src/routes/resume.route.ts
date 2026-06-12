import { FastifyPluginAsync } from "fastify";
import {
  uploadResume,
  getResumeAnalysisById,
} from "../controllers/resume.controller";

const resumeRoutes: FastifyPluginAsync = async (app) => {
  app.post("/upload", uploadResume);
  app.get("/:id", getResumeAnalysisById);
};
export default resumeRoutes;
