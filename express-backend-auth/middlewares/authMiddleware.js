import jwt from "jsonwebtoken";
import UserDB from "../models/User.js";

export var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  console.log(authorization);
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1].replaceAll('"', "");
      // token = authorization.split(" ")[1];
      console.log(token);
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(id);
      req.user = await UserDB.findById(id).select("-password");
      next();
    } catch (e) {
      console.log(e);
      res.send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User, No Token found" });
  }
};
