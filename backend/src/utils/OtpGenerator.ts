import crypto from "crypto";

export const generateOTP = (): string => {
  return crypto.randomInt(100000, 1000000).toString();
};