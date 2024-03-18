import  express  from "express";
import { addPostController, deletePostController, getSinglePostController, likePostController, timelinePostsController, updatePostController } from "../controllers/postsController.js";

const postRoutes = express.Router();

// create a post
postRoutes.post("/", addPostController);


// update a post
postRoutes.put("/:id", updatePostController);

// delete a post

postRoutes.delete("/:id", deletePostController);

// like a post
postRoutes.put("/:id/like", likePostController);


// get a post
postRoutes.get("/:id/post", getSinglePostController)
// get timeline posts
postRoutes.post("/timeline/all", timelinePostsController)

export default postRoutes

