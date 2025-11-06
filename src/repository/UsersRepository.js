import prisma from "../lib/prisma.js";

const getAll = async () => {
  return await prisma.users.findMany();
};

const getByIdUser = async (uuid) => {
  const user = await prisma.users.findUnique({
    where: { uuid },
  });
  return user;
};

const getByEmail = async (email) => {
  const existUser = await prisma.users.findUnique({
    where: { email },
  });
  return existUser;
};

const createUser = async (dataUser) => {
  const user = await prisma.users.create({
    data: {
      name: dataUser.name,
      email: dataUser.email,
      password: dataUser.password,
      role: dataUser.role,
    },
  });
  return user;
};

const updateUser = async (uuid, dataUser) => {
  const updateUser = dataUser;
  const user = await prisma.users.update({
    where: { uuid },
    data: {
      name: updateUser.name,
      email: updateUser.email,
      password: updateUser.password,
      role: updateUser.role,
    },
  });
  return user;
};

const deleteUser = async (uuid) => {
  return await prisma.users.delete({
    where: { uuid },
  });
};

export { getAll, getByIdUser, createUser, updateUser, deleteUser, getByEmail };
