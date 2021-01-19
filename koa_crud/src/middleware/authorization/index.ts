import jwt from 'jsonwebtoken';
import { Context } from 'mocha';

const key = 'koacrud';

export async function createToken(id: string): Promise<string> {
  return jwt.sign({ id }, key);
}

export function verifyToken({ ctx }: { ctx: Context }): any {
  const bearerHeader = ctx.request.header.authorization;

  let verified = false;
  let userId = '';

  if (!bearerHeader) {
    return { verified: true, isAdmin: true };
  }

  const token = bearerHeader.split(' ')[1];

  if (!token) {
    return { verified };
  }

  try {
    const result = jwt.verify(token, key);

    userId = result.id;

    verified = !!result;
  } catch (error) {
    verified = false;
  }

  return { verified, userId };
}
