import { Request, Response } from "express";

const LoginService = require("./services/Login.service");
const SingupService = require("./services/signup.service");

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await LoginService(email, password);
    return res.status(200).json({
      msg: "Login Successfull ",
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

const Singup = async (req: Request, res: Response) => {
      try {
    const { email, password , fullName} = req.body;
    const user = await SingupService(email, password , fullName);
    return res.status(200).json({
      msg: "Singup Successfull ",
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Signup failed",
    });
  }
};

module.exports = { Login, Singup };
