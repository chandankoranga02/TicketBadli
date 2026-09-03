const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const signJwt = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "15d",
    });
};

module.exports = signJwt;