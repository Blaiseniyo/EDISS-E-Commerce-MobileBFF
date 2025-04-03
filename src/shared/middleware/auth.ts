/**
 * auth.ts
 * Authentication middleware for JWT verification
 * author: Blaise Niyonkuru<blaiseniyonkuru12@gmail.com>
 */

import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../../utils/errors';
import { decodeJwt, verifyJwtPayload } from '../../utils/jwt';

/**
 * Middleware to authenticate users via JWT token
 * Verifies:
 * 1. Token has valid "sub" claim (starlord, gamora, drax, rocket, or groot)
 * 2. Token has not expired (exp claim is in the future)
 * 3. Token issuer (iss) is "cmu.edu"
 */
export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new NotAuthorizedError('Authentication required');
    }

    // Get the token part after "Bearer "
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new NotAuthorizedError('Authentication token is missing');
    }

    // Decode the token
    const decodedToken = decodeJwt(token);
    
    // Verify the token meets all requirements
    const { isValid, message } = verifyJwtPayload(decodedToken);
    
    if (!isValid) {
      throw new NotAuthorizedError(message || 'Invalid authentication token');
    }

    next();
  } catch (error) {
    if (error instanceof NotAuthorizedError) {
      next(error);
    } else {
      next(new NotAuthorizedError('Authentication failed'));
    }
  }
};
