import { FastifyInstance } from "fastify";
import { LoginType } from "../users/user.model";
const service = require("./logging.service");

export default async (fastify: FastifyInstance) => {
    fastify.post<{Body: LoginType}>('/login', {
        handler: async (req) => {
            const { db } = fastify;
            const { body } = req;
      
            const token = await service.getToken(db, body);
            return { token };
          },
    }) 
}