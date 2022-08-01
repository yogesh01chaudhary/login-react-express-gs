import express from "express";
import UserDB from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { transporter } from "../config/emailConfig.js";

export default class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    const user = await UserDB.findOne({ email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (name && email && password && password_confirmation && tc) {
        if (password === password_confirmation) {
          try {
            // const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, 12);
            req.body.email = req.body.email.toLowerCase();
            const user = new UserDB({
              name,
              email,
              password: hashPassword,
              password_confirmation,
              tc,
            });
            // user.email.toLowerCase()
            await user.save();
            const saved_user = await UserDB.findOne({ email });
            const token = jwt.sign(
              { id: saved_user._id },
              process.env.SECRET_KEY,
              { expiresIn: "2d" }
            );
            res.status(201).send({
              status: "success",
              message: "Registration Successful",
              token,
            });
          } catch (e) {
            console.log(e);
            res.send({
              status: "failed",
              message: "Unable to register",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "Password and confirm password does not match",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      req.body.email = req.body.email.toLowerCase();
      if (email && password) {
        const user = await UserDB.findOne({ email });
        if (user !== null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
              expiresIn: "2d",
            });
            res.send({ status: "success", message: "Login Successful", token });
          } else {
            res.send({ status: "failed", message: "Invalid Credentials" });
          }
        } else {
          res.send({ status: "failed", message: "User not registered" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    } catch (e) {
      console.log(e);
      res.send({
        status: "failed",
        message: "Unable to login",
      });
    }
  };

  static changeUserPassword = async (req, res) => {
    // console.log("BODY:", req.body);
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: "failed",
          message: "password and confirm password does not match",
        });
      } else {
        const salt = await bcrypt.genSalt(12);
        const newHashPassword = await bcrypt.hash(password, salt);
        console.log(req.user._id);
        await UserDB.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
        res.send({
          status: "success",
          message: "Password changed successfuly",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  };
  static loggedUser = async (req, res) => {
    // console.log(req.user);
    res.send({ user: req.user });
  };

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserDB.findOne({ email });
      if (user) {
        const secret = user._id + process.env.SECRET_KEY;
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: "15m" });
        const link = `http://127.0.0.1:3001/api/user/reset/${user._id}/${token}`;
        // const link = `http://localhost/api/user/reset/${user._id}/${token}`;
        console.log(link);
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link",
          html: `<a href=${link}>Click Here</a> to reset your password `,
        });
        res.send({
          status: "success",
          message: "Link send to your mail ID",
          info,
        });
      } else {
        res.send({ status: "failed", message: "Email doesn't exist" });
      }
    } else {
      res.send({ status: "failed", message: "Email Field is Required" });
    }
  };

  static userPasswordReset = async (req, res) => {
    // console.log(req.body);
    const { password, password_confirmation } = req.body.actualData;
    const { id, token } = req.params;
    const user = await UserDB.findById(id);
    const new_secret = user._id + process.env.SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      // console.log({ password: password, c_password: password_confirmation });

      if (password && password_confirmation) {
        if (password === password_confirmation) {
          const salt = await bcrypt.genSalt(12);
          const newHashPassword = await bcrypt.hash(password, salt);
          // console.log(user._id);
          await UserDB.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });

          res.send({
            status: "success",
            message: "Password reset successfuly",
          });
        } else {
          res.send({
            status: "failed",
            message: "password and confirm password does not match",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (e) {
      console.log(e);
      res.send({ status: "failed", message: "Invalid Token" });
    }
  };
}
