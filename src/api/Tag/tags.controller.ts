import { Request, Response } from "express";
import Tag from "../../models/Tag";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find().populate("posts");

    res.json(tags);
  } catch (error) {
    res.status(500).json({
      message: "Unknown error",
    });
  }
};
export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log("this is my tag", name);
    if (!name) {
      res.status(400).json({ message: "Tag name is required" });
    }
    const newTag = await Tag.create({ name });
    console.log(newTag);
    res.status(201).json(newTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unknown error" });
  }
};
