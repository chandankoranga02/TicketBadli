import { prisma } from "../../../../lib/prisma";
const signJwt = require("../../../utils/jwt.sign");
const getDeviceInfo = require("../../../utils/DeviceInfo");
const generateUserId = require("../../../utils/useridgenerator");

const googleAuth = async (
  accessToken: string,
  userAgent: string,
  ipAddress: string,
  latitude: number,
  longitude: number,
) => {
  if (!accessToken) {
    return {
      code: 400,
      msg: "Google access token is required",
    };
  }

  // Fetch user profile from Google using the access token

    let googleUser: {
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
};


  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) {
      return {
        code: 401,
        msg: "Invalid or expired Google access token",
      };
    }

     googleUser = await response.json();

    if (!googleUser.email || !googleUser.email_verified) {
      return {
        code: 401,
        msg: "Google email is not verified",
      };
    }
  } catch (err) {
    return {
      code: 401,
      msg: "Failed to verify Google token",
    };
  }


  let userId = generateUserId();
  let IsExistitingUserid = await prisma.user.findUnique({ where: { userId } });

  while (IsExistitingUserid) {
    userId = generateUserId();
    IsExistitingUserid = await prisma.user.findUnique({ where: { userId } });
  }

  const DeviceInfo = getDeviceInfo({
    userAgent,
    ipAddress,
    latitude,
    longitude,
  });

  // New user — create account in DB
  const user = await prisma.$transaction(async (tx) => {
    const result = await tx.user.create({
      data: {
        userId : userId,
        email: googleUser.email,
        fullName : googleUser.name,
        provider : "GOOGLE",
        photo : googleUser.picture
      }
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
};

module.exports = googleAuth;
