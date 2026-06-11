import { FastifyPluginAsync } from "fastify";
import { uploadResume } from "../controllers/resume.controller";

const resumeRoutes: FastifyPluginAsync = async (app) => {
  app.post("/upload", uploadResume);
};

export default resumeRoutes;
