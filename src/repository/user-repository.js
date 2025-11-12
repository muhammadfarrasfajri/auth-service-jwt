import { prismaClient } from "../application/database.js";

const get = async (user) => {
  const result = prismaClient.users.findUnique({
    where: { username: user.username },
    select: { username: true, email: true },
  });
  return result;
};

const checkExisUser = async (request) => {
  const existUser = await prismaClient.users.findFirst({
    where: { OR: [{ username: request.username }, { email: request.email }] },
  });
  return existUser;
};

const create = async (user) => {
  const result = await prismaClient.users.create({
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    },
    select: { username: true, email: true },
  });
  return result;
};

const update = async (user, updateUser) => {
  const result = await prismaClient.users.update({
    where: { username: user.username },
    data: {
      username: updateUser.username,
      email: updateUser.email,
      password: updateUser.password,
      role: updateUser.role,
    },
    select: { username: true, email: true },
  });
  return result;
};

const remove = async (user) => {
  return await prismaClient.users.delete({
    where: { username: user.username },
  });
};

const search = async (request, skip, filters) => {
  const filter = filters.length > 0 ? { AND: filters } : {};

  const users = await prismaClient.users.findMany({
    where: filter,
    select: { username: true, email: true },
    take: request.size,
    skip: skip,
  });

  const totalUsers = await prismaClient.users.count({
    where: filter,
  });

  return {
    data: users,
    paging: {
      page: request.page,
      total_item: totalUsers,
      total_page: Math.ceil(totalUsers / request.size),
    },
  };
};
export default { get, create, update, remove, checkExisUser, search };
