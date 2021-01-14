import jwt from 'jsonwebtoken';
import { Context } from 'mocha';

const key = 'koacrud';

export async function createToken(username: string): Promise<string> {
  return jwt.sign({ username }, key);
}

export function verifyToken(ctx: Context): any {
  const bearerHeader = ctx.ctx.request.header.authorization;

  let verified = false;

  if (!bearerHeader) {
    return { verified: true };
  }

  const token = bearerHeader.split(' ')[1];

  if (!token) {
    return { verified };
  }

  try {
    const result = jwt.verify(token, key);
    verified = !!result;
  } catch (error) {
    verified = false;
  }

  return { verified };
}

export function setToken(ctx, next) {
  const bearerHeader = ctx.request.header.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];

    ctx.token = token;

    next();
  } else {
    ctx.status = 403;
  }
}
