const  crypto = require("crypto");

const generateUserId = (): string => {
  return crypto.randomBytes(5)
    .toString("base64url")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase()
    .slice(0, 7);
};

export default generateUserId;