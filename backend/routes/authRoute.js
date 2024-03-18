import express from "express";
import { loginController, registerController } from "../controllers/registerController.js";
import { deleteController, followUserController, getUserController, unfollowUserController, updateController } from "../controllers/userController.js";

const authRoute = express.Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.put("/:userID", updateController);
authRoute.delete("/:id", deleteController);
authRoute.get("/:id", getUserController);

// user follow
// /api/v1/
authRoute.put("/:id/follow", followUserController);

// user unfollow
// /api/v1/
authRoute.put("/:id/unfollow", unfollowUserController)

export default authRoute
