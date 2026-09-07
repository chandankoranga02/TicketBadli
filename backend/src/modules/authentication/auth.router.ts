const { Router } = require("express");
const router = Router();

const { Login, Singup , Logout , Google } = require("../authentication/auth.controller");
const { GenerateOtp , VerifyOtp , ForgetPassword } = require("../authentication/otp.controller")

router.post("/login", Login);
router.post("/signup", Singup);
router.post("/logout", Logout);
router.post("/google", Google);


router.post("/otp/generateOTP" , GenerateOtp);
router.post("/otp/verifyOTP" , VerifyOtp);
router.post("/resetPassword", ForgetPassword);

module.exports = router;