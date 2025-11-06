import prisma from "../lib/prisma.js";

const getAll = async () => {
  return await prisma.products.findMany();
};

const getByIdProduct = async (uuid) => {
  return await prisma.products.findUnique({
    where: { uuid },
  });
};

const createProduct = async (productData) => {
  return await prisma.products.create({
    data: {
      name: productData.name,
      price: productData.price,
      userId: productData.userId,
    },
  });
};

const updateProduct = async (uuid, productData) => {
  const updateData = productData;
  const data = await prisma.products.update({
    where: { uuid },
    data: {
      name: updateData.name,
      price: updateData.price,
    },
  });
  return data;
};

const deleteProduct = async (uuid) => {
  return await prisma.products.delete({
    where: { uuid },
  });
};

export { getAll, getByIdProduct, createProduct, updateProduct, deleteProduct };
