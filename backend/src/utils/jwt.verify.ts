const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const Jwtverify = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = Jwtverify;