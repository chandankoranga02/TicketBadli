const GenerateOtp = require("../../../utils/OtpGenerator");
const bcrypt = require("bcrypt");
const resend = require("../../../config/resend")
const ResetPasswordTemplate =require("../../../Templates/ForgetPassword.template")
const redis =require("../../../config/redis");

const ForgetPasswordOtpGenerationService = async  (email : string)=>{
   if (!email){
    throw new Error( " Enter Email first ")
   }

   const randomOTP = GenerateOtp();
   const otpHash = await bcrypt.hash(randomOTP.toString(), 10);
   const expiresAt = 300;

   await redis.set(`otp:${email}` , otpHash , {EX : expiresAt});
  
  const { error } = await resend.emails.send({
    from: "TicketBadli <no-reply@appnests.in>",
    to: [email],
    subject: "Reset Your Password -TickBadli",
    html: ResetPasswordTemplate(randomOTP),
  });

  if (error) {
    throw new Error("Failed to send OTP email");
  }

  return {
    message: "OTP sent successfully",
  };

}

export default ForgetPasswordOtpGenerationService;