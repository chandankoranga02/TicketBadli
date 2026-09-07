import { Request, Response } from "express";

const GenerateOtpService = require("../authentication/services/generateOtp.service");
const VerifyOtpService = require("../authentication/services/verifyOtp.service")


const GenerateOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await GenerateOtpService(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const VerifyOtp = async (req: Request, res: Response) => {
   const { email, otp } = req.body;
    
   const result = await VerifyOtpService({email , otp})
    
};

const ForgetPassword = async (req: Request, res: Response) => {};

module.exports = { GenerateOtp, VerifyOtp, ForgetPassword };
