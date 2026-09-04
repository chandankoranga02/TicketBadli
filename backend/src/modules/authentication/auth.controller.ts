import { Request, Response } from "express";

const LoginService = require("./services/Login.service");
const SingupService = require("./services/signup.service");

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password, latitude, longitude } = req.body;
    const userAgent = req.headers["user-agent"];
    const ipAddress = req.ip;
    const {user , token}= await LoginService(
      email,
      password,
      latitude,
      longitude,
      userAgent,
      ipAddress,
    );

    res.cookie("Token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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
    const { email, password, fullName, latitude, longitude } = req.body;
    const userAgent = req.headers["user-agent"];
    const ipAddress = req.ip;
    const { user, token } = await SingupService(
      email,
      password,
      fullName,
      latitude,
      longitude,
      userAgent,
      ipAddress,
    );

    res.cookie("Token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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


const Logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("Token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

const Google = async (req: Request, res: Response) => {};

module.exports = { Login, Singup, Google, Logout };
