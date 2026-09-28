const bcrypt = require("bcrypt");;
const crypto = require("crypto");
const redis = require("../../../config/redis");


const VerifyOtpService = async (email: string, otp: number) => {
  // 1. Check input
  if (!email) {
    throw new Error("Email is required");
  }

  if (!otp) {
    throw new Error("OTP is required");
  }

  // 2. Find OTP record corresponding to email
  const otphash = await redis.get(`otp:${email}`);

  if (!otphash) {
    throw new Error("OTP not found or OTP expired");
  }


  const isOtpValid = await bcrypt.compare(
    otp.toString(),
    otphash
  );

  if (!otphash) {
    throw new Error("Invalid OTP");
  }


  // 6. OTP cannot be reused
  await redis.del(`otp:${email}`);

  return {
    message: "OTP verified successfully",
  
  };
};

export default VerifyOtpService;