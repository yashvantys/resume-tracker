import Fastify from "fastify";
import multipart from "@fastify/multipart";
import resumeRoutes from "./routes/resume.route";
import { logger } from "./utills/logger";

const app = Fastify({
  logger
});

const start = async () => {
  try {
    await app.register(multipart);
    await app.register(resumeRoutes, {
      prefix: "/api/resume",
    });

    await app.listen({
      port: 3000,
    });

    console.log("Server started");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
