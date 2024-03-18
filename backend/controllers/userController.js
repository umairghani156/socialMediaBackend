import Register from "../models/register.js";
import bcrypt from "bcrypt";
export const updateController = async (req, res) => {
  try {
    let { userID } = req.params;
    let { userName, email, password } = req.body;
    if (req.body.userId === userID) {
      if (password) {
        try {
          let salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(password, salt);
        }
        catch (error) {
          return res.status(500).json({
            status: false,
            message: "Internal Error!",
            error: error.message
          })
        };



      }
      const user = await Register.findByIdAndUpdate(userID, { $set: req.body })
      console.log("user", user);
      if (user) return res.status(200).json({
        status: true,
        message: "Updated Successfully",
        data: user
      })

    }

  }
  catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Error!",
      error: error.message
    })
  }
};

export const deleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Register.findByIdAndDelete(id);
    if (user) return res.status(200).json({
      status: true,
      message: "Deleted Successfully"
    })

  }
  catch (error) {
    res.status(400).json({
      status: false,
      message: "Internal Error"
    })
  }
}

// Get a user 

export const getUserController = async (req, res) => {

  try {
    const {id} = req.params;
    const user = await Register.findById(id);
    const {password, updatedAt, ...other} = user._doc;
    console.log(other);
    if(user) return res.status(200).json({
      status: true,
      message: "User got Successfully",
      data: other
    })
  }
  catch (error) {
    res.status(403).json({
      status: false,
      message: "Internal Error",
      error: error.message
    })
  }
};

// Follow a user

export const followUserController = async(req, res)=>{

  if(req.params.id !==  req.body.userId){
     try{
     
        const user = await Register.findById(req.params.id);
        const currentUser = await Register.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
        const userOne = await user.updateOne({$push: {followers: req.body.userId}});
        const currentUserOne = await currentUser.updateOne({$push: {following: req.params.id}});
        if(userOne && currentUserOne) return res.status(200).json({
          status: true,
          message: "User has been followed"
         })
        }else{
          res.status(403).json({
            status: false,
            message: "You already follow this user"
          })
        }
        res.status(200).json({
         status: true,
         message: "User has been followed",
         data: user
        })
      }
      catch(error){
       res.status(404).json({
         status: false,
         message: "Internal error",
         error: error.message
       })
      
     }
     }else{
      res.status(403).json({
        status: false,
        message: "You can't follow yourself"
      })
     }
};

// User Unfollow
export const unfollowUserController = async(req, res)=>{

  if(req.params.id !==  req.body.userId){
     try{
     
        const user = await Register.findById(req.params.id);
        const currentUser = await Register.findById(req.body.userId);
        if(user.followers.includes(req.body.userId)){
        const userOne = await user.updateOne({$pull: {followers: req.body.userId}});
        const currentUserOne = await currentUser.updateOne({$pull: {following: req.params.id}});
        if(userOne && currentUserOne) return res.status(200).json({
          status: true,
          message: "User has been unfollowed"
         })
        }else{
          res.status(403).json({
            status: false,
            message: "You don't follow this user"
          })
        }
        res.status(200).json({
         status: true,
         message: "User has been followed",
         data: user
        })
      }
      catch(error){
       res.status(404).json({
         status: false,
         message: "Internal error",
         error: error.message
       })
      
     }
     }else{
      res.status(403).json({
        status: false,
        message: "You can't follow yourself"
      })
     }
}