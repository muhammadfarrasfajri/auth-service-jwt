import prisma from "../lib/prisma.js";

const getRefreshToken = async (refreshToken) => {
  const token = await prisma.users.findFirst({
    where: { refreshToken },
  });
  return token;
};

const updateAuth = async (uuid, refreshToken) => {
  const user = await prisma.users.update({
    where: { uuid: uuid },
    data: { refreshToken },
  });
  return user;
};

export { getRefreshToken, updateAuth };
