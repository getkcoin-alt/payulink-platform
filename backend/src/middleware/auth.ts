import { FastifyRequest, FastifyReply } from 'fastify';

export interface TokenPayload {
  id: string;
  username: string;
  role: string;
  email: string;
}


/**
 * Fastify preHandler hook to verify JWT authentication token.
 * Attaches decoded user payload to request.user on success.
 */
export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      reply.status(401).send({ code: 401, message: 'Missing or invalid Authorization header' });
      return;
    }

    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ code: 401, message: 'Unauthorized or expired session' });
  }
}

/**
 * Role-based access control guard middleware.
 * Ensures caller possesses required administrative role.
 */
export function requireRole(...allowedRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await authenticate(request, reply);
    const user = request.user as any;
    const userRole = user?.role;
    if (!userRole || (!allowedRoles.includes(userRole) && userRole !== 'SUPER_ADMIN')) {
      reply.status(403).send({ code: 403, message: 'Forbidden: Insufficient role permissions' });
    }
  };
}
