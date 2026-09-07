import { Request, Response } from "express";

const GenerateOtpService = require("../authentication/services/generateOtp.service")

const GenerateOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  const GenerateOtp = await GenerateOtpService(email);
};

const VerifyOtp = async (req: Request, res: Response) => {
  
};

const ForgetPassword = async (req: Request, res: Response) => {
  
};


module.exports = { GenerateOtp , VerifyOtp , ForgetPassword };