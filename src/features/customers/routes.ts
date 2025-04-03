/*
routes.ts
description: This file contains the routes for the customers
author: Blaise Niyonkuru<blaiseniyonkuru12@gmail.com>
*/

import express from "express";
import customerController from "./controllers";

const routes = express.Router();

// POST /customers - Add a new customer
routes.post(
  "/",
  customerController.createCustomer
);

// GET /customers/:id - Get a customer by ID
routes.get(
  "/:id",
  customerController.getCustomerById
);

// GET /customers?userId=xxx - Get a customer by user ID (email)
routes.get(
  "/",
  customerController.getCustomerByUserId
);

export default routes;