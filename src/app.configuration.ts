/**
 *
 *  Dependencies
 *
 */
import express, { Express, Request, Response } from "express";

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";

import {authenticate} from "./shared/middleware/";

/**
 *
 * Configs
 *
 */
import { FRONTEND_URL, NODE_ENV } from "./config/basic";

/**
 *
 * Utils
 *
 */

const corsOptions = {
  origin: [FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const MORGAN_FORMAT = NODE_ENV === "prod" ? "combined" : "dev";

export const configureApp = (app: Express): Express => {
  morgan.token("user", (req: Request, res: Response) => {
    return req.user ? JSON.stringify(req.user) : "user not logged in";
  });
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan(MORGAN_FORMAT));
  app.use(authenticate);

  return app;
};
