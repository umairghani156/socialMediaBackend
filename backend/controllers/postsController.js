import mongoose from "mongoose";
import Post from "../models/post.js";
import Register from "../models/register.js";
export const addPostController = async (req, res) => {
    try {
      const post = await Post.create(req.body);
      if(post) return res.status(200).json({
        status: true,
        message: "Post uploaded Successfully",
        data : post
      })
    }
    catch (error) {
        res.status(403).json({
            status: false,
            message: "Error in uploading Post",
            error: error.message
        })
    };
};

// Update Post

export const updatePostController = async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
            const updatedPost =  await post.updateOne({$set: req.body})
            return res.status(200).json({
                status: true,
                message: "Post Updated Successfully",
                data: updatedPost
            })
        }else{
            res.status(403).json({
                status: true,
                message: "You can update only your post"
            })
        }

    }
    catch(error){
        res.status(403).json({
            status: false,
            message: "Id not matched",
            error: error.message
        })
    }
};

// Delete Post 
/*
export const deletePostController = async(req, res)=>{
    try{
        const {id} = req.params;
        const findDeletePost = await Post.deleteOne({_id: id});
        if(findDeletePost) return res.json({
            status: true,
            message: "Post has been Deleted successfully"
        });
    }
    catch(error){
      res.status(500).json({
        status:  true,
        message: "Internal error",
        error: error.message,
      })
    }
};
*/

// Delete Post 2nd Method
export const deletePostController = async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
            const deletePost =  await post.deleteOne();
            return res.status(200).json({
                status: true,
                message: "Post has been deleted",
                data: deletePost
            })
        }else{
            res.status(403).json({
                status: false,
                message: "You can delete only your post"
            })
        }

    }
    catch(error){
        res.status(403).json({
            status: false,
            message: "Id not matched",
            error: error.message
        })
    }
};

// Like and Dislike Post

export const likePostController = async (req, res) =>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id)
        if(!post.likes.includes(userId)) {
            await post.updateOne({$push: {likes: userId}})
            res.status(200).json({
               status: true,
               message: "Post has been liked"
            });
        }else{
            await post.updateOne({$pull: {likes: userId}})
            res.status(200).json({
               status: true,
               message: "Post has been disliked"
            });
        }
        
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: "Internal Error",
            error: error.message
        })
    }
};

// Get Single Post

export const getSinglePostController =async (req, res) =>{
     try{
        const post = await Post.findById(req.params.id);
        if(post) return res.status(200).json({
            status: true,
            message: "Get a Post Successfully",
            data: post
        })
     }
     catch(error){
        res.status(500).json({
            status: false,
            message: "Internal Error in getting a Post",
            error: error.message
        })
     }
};

// timeline Posts

export const timelinePostsController = async (req, res)=>{
    let postArray = [];
    try{
      const currentUser = await Register.findById(req.body.userId);
      const userPost = await Post.find({userId: currentUser._id});
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId)=>{
           return  Post.find({userId: friendId})
        })
      );
      res.json(userPost.concat(...friendPosts))

    }
    catch(error){
        res.status(500).json({
            status: false,
            message: "Error in getting Timeline Posts",
            error: error.message
        })
    }
}
