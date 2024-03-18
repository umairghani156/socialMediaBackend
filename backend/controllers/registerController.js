import Register from "../models/register.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    try{
       const {userName, email, password} =  req.body;
       if(!userName || !email || !password) return res.json({
        status: false,
        message: "All fields required"
       });
       const user = await Register.create({
        userName,
        email,
        password : hashedPassword
    });
    
       res.json({
        status: true,
        message: "Registered Successfully"
       })
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: "Internal Error happend",
            error: error.message
        })
    }
};

export const loginController = async (req, res) =>{
   try{
      const {email, password} = req.body;
      const isUserExist = await Register.findOne({email: email});
      console.log("isUserExist", isUserExist);
      if(!isUserExist) return res.json({
          status: false,
          message: "No User Found"
      });
      const validPassword = await bcrypt.compare(req.body.password, isUserExist.password);
      if(!validPassword) return res.status(400).json({
        status: false,
        message: "Wrong Password"
      });
      res.json({
        status: true,
        message: "User logged in Successfully",
        data: isUserExist
      })
   }
   catch(error){
    res.status(500).json({
        status: false,
        message: "Internal Error!",
        error: error.message
    })
   }
}

