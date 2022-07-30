import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import { checkUserAuth } from "../middlewares/authMiddleware.js";

router.use("/changePassword", checkUserAuth);
router.use("/loggedUserDetails", checkUserAuth);

//public route
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.post(
  "/send-password-reset-email",
  UserController.sendUserPasswordResetEmail
);
router.post("/reset-password/:id/:token", UserController.userPasswordReset);
//private route
router.post("/changePassword", UserController.changeUserPassword);
router.get("/loggedUserDetails", UserController.loggedUser);
export default router;
