const bcrypt = require("bcrypt");
const prisma = require("../../../config/prisma");

const ForgetPasswordService = async (
  email: string,
  password: string,
  verificationToken: string,
) => {

     // Token and pending 
     // Verificaiton token storing in redis 

  const user = await prisma.user.findUnique({
    where: { email : email}});

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

// store verification toekn in redis  

  return {
    message: "Password updated successfully",
  };
};

export default ForgetPasswordService;
