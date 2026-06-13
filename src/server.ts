import Fastify from "fastify";
import multipart from "@fastify/multipart";
import resumeRoutes from "./routes/resume.route";
import { logger } from "./utills/logger";
import { v4 as uuidv4 } from "uuid";

const app = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: false,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  },
  genReqId: () => uuidv4(),  
});
app.addHook("onRequest", async (request) => {
  request.headers["x-trace-id"] = uuidv4();

  request.log.info({
    traceId: request.headers["x-trace-id"],
  });
});
const start = async () => {
  try {
    await app.register(multipart);
    await app.register(resumeRoutes, {
      prefix: "/api/resume",
    });

    app.get("/health", async (request, reply) => {
      console.log("request.id =", request.id);

      reply.send({
        status: "ok",
        requestId: request.id,
      });
    });

    await app.listen({
      port: 3000,
    });

    logger.info("Server started");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
