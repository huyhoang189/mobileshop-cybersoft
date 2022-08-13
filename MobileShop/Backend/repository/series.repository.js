const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllSeries = async () => {
  try {
    return await prisma.series.findMany({
      include: {
        manufacture: true,
      },
    });
  } catch (err) {
    return false;
  }
};

const getSerieById = async (id) => {
  try {
    return await prisma.series.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });
  } catch (error) {
    return false;
  }
};

const createSerie = async (serie) => {
  try {
    return await prisma.series.create({
      data: {
        name: serie.name,
        sort_name: serie.sort_name,
        manufacture_id: serie.manufacture_id,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateSerie = async (serie) => {
  try {
    return await prisma.series.update({
      where: {
        id,
      },
      data: {
        name: serie.name,
        sort_name: serie.sort_name,
        manufacture_id: serie.manufacturer_id,
      },
    });
  } catch (error) {
    return false;
  }
};

const deleteSerie = async (id) => {
  try {
    return await prisma.series.delete({
      where: { id },
    });
  } catch (error) {
    return false;
  }
};

module.exports = {
  getAllSeries,
  getSerieById,
  deleteSerie,
  createSerie,
  updateSerie,
};
