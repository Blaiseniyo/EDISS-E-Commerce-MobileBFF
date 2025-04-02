/**
 * jwt/index.ts
 * Utility functions for JWT token handling
 * author: Blaise Niyonkuru<blaiseniyonkuru12@gmail.com>
 */

interface JwtPayload {
  sub?: string;
  exp?: number;
  iss?: string;
  [key: string]: any;
}

/**
 * Decodes a JWT token without verification
 * @param token - The JWT token to decode
 * @returns The decoded token payload or null if invalid
 */
export function decodeJwt(token: string): JwtPayload | null {
  try {
    // Split the token into its parts: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Base64Url decode the payload (middle part)
    const payload = parts[1];
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf8');
    
    // Parse the JSON payload
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Verifies if a JWT token meets specific requirements
 * @param payload - The decoded JWT payload
 * @returns An object with the verification result and error message if any
 */
export function verifyJwtPayload(payload: JwtPayload | null): { isValid: boolean; message?: string } {
  if (!payload) {
    return { isValid: false, message: 'Invalid token format' };
  }

  // 1. Verify "sub" claim is one of the allowed users
  const allowedUsers = ['starlord', 'gamora', 'drax', 'rocket', 'groot'];
  if (!payload.sub || !allowedUsers.includes(payload.sub)) {
    return { isValid: false, message: 'Invalid subject in token' };
  }

  // 2. Verify "exp" claim is in the future
  if (!payload.exp || typeof payload.exp !== 'number') {
    return { isValid: false, message: 'Missing or invalid expiration time' };
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (payload.exp <= currentTimestamp) {
    return { isValid: false, message: 'Token has expired' };
  }

  // 3. Verify "iss" claim is "cmu.edu"
  if (!payload.iss || payload.iss !== 'cmu.edu') {
    return { isValid: false, message: 'Invalid token issuer' };
  }

  return { isValid: true };
}
