import { prismaClient } from "../application/database.js";

const list = async (user) => {
  return await prismaClient.products.findMany({
    where: { username: user.username },
    select: {
      uuid: true,
      name: true,
      price: true,
    },
  });
};

const get = async (username, uuid) => {
  return await prismaClient.products.findFirst({
    where: { username: username, uuid: uuid },
    select: { uuid: true, name: true, price: true },
  });
};

const create = async (username, product) => {
  return await prismaClient.products.create({
    data: {
      name: product.name,
      price: product.price,
      username: username,
    },
  });
};

const update = async (user, uuid, updateProduct) => {
  return await prismaClient.products.update({
    where: { uuid: uuid, username: user.username },
    data: {
      name: updateProduct.name,
      price: updateProduct.price,
    },
  });
};

const remove = async (username, uuid) => {
  return await prismaClient.products.delete({
    where: { uuid: uuid, username: username },
  });
};

export default { list, get, create, update, remove };
