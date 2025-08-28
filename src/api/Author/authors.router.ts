import express from "express";
import { createAuthor, getAuthors } from "./authors.controller";

const router = express.Router();

router.get("/", getAuthors);
router.post("/", createAuthor);
export default router;
