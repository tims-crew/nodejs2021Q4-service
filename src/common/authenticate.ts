import { FastifyRequest, FastifyReply } from 'fastify';

import bcrypt = require('bcrypt');

const allowed = ['boards', 'tasks', 'users'];

// TODO: fix the bugs in user.routes
// ADD: getToken method

export const genHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_SIZE as string, 10)); // make the level of encryption
  return await bcrypt.hash(password, salt);
};

export default async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const route = req.url.split('/');

    if (allowed.includes(route[1])) {
      await req.jwtVerify();
    }
  } catch (err) {
    reply.code(401).send();
  }
};