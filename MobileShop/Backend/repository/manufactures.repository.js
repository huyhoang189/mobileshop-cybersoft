const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllManufactures = async () => {
  try {
    return await prisma.manufactures.findMany({
      include: {
        serie: true,
      },
    });
  } catch (err) {
    return false;
  }
};

const getManufactureById = async (id) => {
  try {
    return await prisma.manufactures.findUnique({
      where: {
        id,
      },
      include: {
        serie: true,
      },
    });
  } catch (error) {
    return false;
  }
};

const getManufactureByName = async (name) => {
  try {
    return await prisma.manufactures.findUnique({
      where: {
        name,
      },
      include: {
        serie: true,
      },
    });
  } catch (error) {
    return false;
  }
};

const createManufacture = async (manufacture) => {
  try {
    return await prisma.manufactures.create({
      data: {
        name: manufacture.name,
        description: manufacture.description,
        thumbail: manufacture.thumbail,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateManufacture = async (manufacture) => {
  try {
    return await prisma.manufactures.update({
      where: {
        id: manufacture.id,
      },
      data: {
        name: manufacture.name,
        description: manufacture.description,
        thumbail: manufacture.thumbail,
      },
    });
  } catch (error) {
    return false;
  }
};

const deleteManufacture = async (id) => {
  try {
    return await prisma.manufactures.delete({
      where: { id },
    });
  } catch (error) {
    return false;
  }
};

module.exports = {
  getAllManufactures,
  getManufactureById,
  deleteManufacture,
  createManufacture,
  updateManufacture,
  getManufactureByName,
};
