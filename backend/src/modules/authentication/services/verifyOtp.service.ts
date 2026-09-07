const bcrypt = require("bcrypt");
const prisma = require("../../../config/prisma");
const crypto = require("crypto");

const VerifyOtpService = async (email: string, otp: number) => {
  // 1. Check input
  if (!email) {
    throw new Error("Email is required");
  }

  if (!otp) {
    throw new Error("OTP is required");
  }

  // 2. Find OTP record corresponding to email
  const otpRecord = await prisma.otp.findFirst({
    where: {
      email,
    },
  });

  if (!otpRecord) {
    throw new Error("OTP not found");
  }

  // 3. Check expiry BEFORE comparing OTP
  if (new Date() > otpRecord.expiresAt) {
    await prisma.otp.delete({
      where: {
        id: otpRecord.id,
      },
    });

    throw new Error("OTP has expired");
  }


  const isOtpValid = await bcrypt.compare(
    otp.toString(),
    otpRecord.otpHash
  );

  if (!isOtpValid) {
    throw new Error("Invalid OTP");
  }


  const verificationToken = crypto.randomBytes(32).toString("hex");

  // 6. OTP cannot be reused
  await prisma.otp.delete({
    where: {
      id: otpRecord.id,
    },
  });

  // TODO:
  // verificationToken ko DB/Redis mein store karna hoga
  // with expiry before signup can securely use it.

  return {
    message: "OTP verified successfully",
    verificationToken,
  };
};

export default VerifyOtpService;