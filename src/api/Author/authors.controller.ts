import { Request, Response } from "express";
import Author from "../../models/Author";

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find().populate(["posts"]);
    res.json(authors);
  } catch (error) {
    res.status(500).json({
      message: "Unknown error",
    });
  }
};
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: "Unknown error" });
  }
};
