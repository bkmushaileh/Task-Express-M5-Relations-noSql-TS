import { Request, Response } from "express";
import Post from "../models/Post";
import Author from "../models/Author";
import Tag from "../models/Tag";
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate(["author", "tags"]);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.body.author);
    if (!author) {
      res.sendStatus(400);
    }
    const post = await Post.create(req.body);
    author?.posts.push(post.id);
    await author?.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(401).json({ message: "Post not Found!" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const { tagId } = req.params;
  const { postId } = req.params;
  console.log(tagId, postId);
  const myTag = await Tag.findById(tagId);
  const myPost = await Post.findById(postId);

  try {
    // const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    // });
    const post = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    const tag = await Tag.findById(tagId);
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
    }
    post?.tags.push(tag!._id);
    await post?.save();
    tag?.posts.push(post!._id);
    await tag?.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

export { getAllPosts, createPost, getPostById, updatePost, deletePost };
