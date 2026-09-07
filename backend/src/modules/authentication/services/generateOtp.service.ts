const GenerateOtp = require("../../../utils/OtpGenerator");
const bcrypt = require("bcrypt");
const resend = require("../../../config/resend")
const VerifyOtpTemplate =require("../../../Templates/VerifyOtp.template")
const prisma =require("../../../config/prisma");

const GenerateOtpService = async  (email : string)=>{
   if (!email){
    throw new Error( " Enter Email first ")
   }

   const randomOTP = GenerateOtp();
   const otpHash = await bcrypt.hash(randomOTP.toString(), 10);
   const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

   await prisma.otp.deleteMany({
    where: {
      email,
    },
  });

  await prisma.otp.create({
    data: {
      email,
      otpHash,
      expiresAt,
    },
  });
  
  const { error } = await resend.emails.send({
    from: "TicketBadli <no-reply@appnests.in>",
    to: [email],
    subject: "Verify your TicketBadli email",
    html: VerifyOtpTemplate(randomOTP),
  });

  if (error) {
    throw new Error("Failed to send OTP email");
  }

  return {
    message: "OTP sent successfully",
  };

}

export default GenerateOtpService;