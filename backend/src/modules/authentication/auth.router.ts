const { Router } = require("express");
const router = Router();

const { Login, Singup , Logout , Google } = require("../authentication/auth.controller");


router.post("/login", Login);
router.post("/signup", Singup);
router.post("/logout", Logout);
router.post("/google", Google);

module.exports = router;