import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        username: string;
        [key: string]: any;
      };
    }
  }
}
