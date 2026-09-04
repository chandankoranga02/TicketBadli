const bcrypt = require("bcrypt");
import { prisma } from "../../../../lib/prisma";
const signJwt = require("../../../utils/jwt.sign");
const getDeviceInfo = require("../../../utils/DeviceInfo");

const LoginService = async (
  email: string,
  password: string,
  latitude: number,
  longitude: number,
  userAgent: string,
  ipAddress: string,
) => {
  const user = await prisma.user.findUnique({
    where: { email: email}});

  if (!user) {
    throw new Error("User doesn't exists");
  }

  const passwordValidate = await bcrypt.compare(password, user.password);
   if (!passwordValidate) {
    throw new Error("Incorrect password");
  }

  const DeviceInfo = getDeviceInfo({
    userAgent,
    ipAddress,
    latitude,
    longitude,
  });

  await prisma.userDevice.create({
    data: {
      userId: user.id,
      deviceName: DeviceInfo.deviceName,
      ipAddress: DeviceInfo.ipAddress,
      os: DeviceInfo.os,
      browser: DeviceInfo.browser,
      latitude: DeviceInfo.latitude,
      longitude: DeviceInfo.longitude,
    },
  });

  const token = signJwt({ userId: user.id });

  return {
    user,
    token,
  };
};

module.exports = {
  LoginService,
};
