const bcrypt = require("bcrypt");
const { prisma } = require("../../../../lib/prisma");
const signJwt = require("../../../utils/jwt.sign");


const signupService = async ( email: string, password: string, fullName: string) => {
  
    const existingUser = await prisma.user.findUnique({ where: {email} });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      fullName,
    },
  });

  const token = signJwt({ userId: user.id ,});

  return {
    user,
    token,
  };
};

module.exports = {
  signupService,
};
