/*
routes.ts
description: This file contains the routes for the books
author: Blaise Niyonkuru<blaiseniyonkuru12@gmail.com>
*/

import express from "express";
import bookController from "./controllers";

const routes = express.Router();

// POST /books - Add a new book
routes.post(
  "/",
  bookController.createBook
);

// PUT /books/:ISBN - Update a book
routes.put(
  "/:ISBN",
  bookController.updateBook
);

// GET /books/:ISBN - Get a book by ISBN
routes.get(
  "/:ISBN",
  bookController.getBook
);

// GET /books/isbn/:ISBN - Alternative endpoint for getting a book by ISBN
routes.get(
  "/isbn/:ISBN",
  bookController.getBook
);

export default routes;