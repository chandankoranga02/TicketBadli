const { Router } = require("express");
const router = Router();

const { Login, Singup } = require("../authentication/auth.controller");


router.post("/login", Login);
router.post("/signup", Singup);

module.exports = router;