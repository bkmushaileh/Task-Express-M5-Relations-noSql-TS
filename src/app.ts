import express from "express";
import connectDB from "./database";
import postsRouter from "./api/posts.routers";
import authorsRouter from "./api/Author/authors.router";
import tagRouter from "./api/Tag/tags.routers";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";
import { env } from "./config";

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);
app.use("/authors", authorsRouter);
app.use("/tags", tagRouter);

app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
