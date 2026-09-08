import { Request, Response } from "express";

const GenerateOtpService = require("../authentication/services/generateOtp.service");
const VerifyOtpService = require("../authentication/services/verifyOtp.service");
const ForgetPasswordService = require("../authentication/services/ForgetPassword.service");
const ForgetPasswordOtpGenerationService = require("../authentication/services/ForgetPasswordOtp.service");

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
  try {
    const { email, otp } = req.body;
    const result = await VerifyOtpService({ email, otp });

    return res.status(200).json({
      success: true,
      message: result.message,
      verificationtoken: result.verificationToken,
    });
  } catch (error: any) {
    console.error("Verify OTP Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "OTP verification failed",
    });
  }
};

const ForgetPassword = async (req: Request, res: Response) => {
  const { email, password, verificationTOken } = req.body;

  const result = ForgetPasswordService({ email, password, verificationTOken });
};

const ForgetPasswordOtpGeneration = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = ForgetPasswordOtpGenerationService({ email });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

module.exports = {
  GenerateOtp,
  VerifyOtp,
  ForgetPassword,
  ForgetPasswordOtpGeneration,
};
