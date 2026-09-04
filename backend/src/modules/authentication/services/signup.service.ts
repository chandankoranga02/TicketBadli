const bcrypt = require("bcrypt");
import { prisma } from "../../../../lib/prisma";
const signJwt = require("../../../utils/jwt.sign");
const getDeviceInfo = require("../../../utils/DeviceInfo");
const generateUserId = require("../../../utils/useridgenerator");
const signupService = async (
  email: string,
  password: string,
  fullName: string,
  latitude: number,
  longitude: number,
  userAgent: string,
  ipAddress: string,
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  } 
  let userId = generateUserId();
  let IsExistitingUserid = await prisma.user.findUnique({ where: { userId } });

  while (IsExistitingUserid) {
    userId = generateUserId();
    IsExistitingUserid = await prisma.user.findUnique({ where: { userId } });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const DeviceInfo = getDeviceInfo({
    userAgent,
    ipAddress,
    latitude,
    longitude,
  });

  const user = await prisma.$transaction(async (tx) => {
    const result = await tx.user.create({
      data: {
        userId,
        email,
        password: hashedPassword,
        fullName,
      },
    });

    await tx.userDevice.create({
      data: {
        userId: result.id,
        deviceName: DeviceInfo.deviceName,
        ipAddress: DeviceInfo.ipAddress,
        os: DeviceInfo.os,
        browser: DeviceInfo.browser,
        latitude: DeviceInfo.latitude,
        longitude: DeviceInfo.longitude,
      },
    });

    return result;
  });

  const token = signJwt({ userId: user.id });

  return {
    user,
    token,
  };
};

module.exports = {
  signupService,
};
