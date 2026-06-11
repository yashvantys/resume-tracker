import { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";

export async function registerMultipart(app: FastifyInstance) {
  await app.register(multipart, { attachFieldsToBody: true });
}
