import { prismaClient } from "../application/database.js";

const getRefreshToken = async (user, refreshToken) => {
  return await prismaClient.users.findFirst({
    where: { username: user.username, refreshToken: refreshToken },
  });
};

const updateAuth = async (user, refreshToken) => {
  return await prismaClient.users.update({
    where: { username: user.username },
    data: { refreshToken },
  });
};

export default { getRefreshToken, updateAuth };
