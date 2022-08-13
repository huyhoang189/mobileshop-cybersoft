const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async () => {
  try {
    return await prisma.products.findMany({
      include: {
        serie: {
          include: {
            manufacture: true,
          },
        },
      },
    });
  } catch (err) {
    return false;
  }
};

const getProductById = async (id) => {
  try {
    return await prisma.products.findUnique({
      where: id,
    });
  } catch (error) {
    return false;
  }
};

const createProduct = async (product) => {
  try {
    return await prisma.products.create({
      data: {
        name: product.name,
        thumbail: product.thumbail,
        description: product.description,
        price: product.price,
        count: product.count,
        serie_id: product.serie_id,
      },
    });
  } catch (error) {
    console.log("create error");
    return false;
  }
};

const updateProduct = async (product) => {
  try {
    return await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        thumbail: product.thumbail,
        description: product.description,
        price: product.price,
        count: product.count,
        serie_id: product.serie_id,
      },
    });
  } catch (error) {
    return false;
  }
};

const deleteProduct = async (id) => {
  try {
    return await prisma.products.delete({
      where: { id },
    });
  } catch (error) {
    return false;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
