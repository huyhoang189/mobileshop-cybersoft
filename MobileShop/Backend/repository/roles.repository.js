const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllRoles = async () => {
  try {
    return await prisma.roles.findMany();
  } catch (err) {
    return false;
  }
};

const getRoleById = async (id) => {
  try {
    return await prisma.roles.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return false;
  }
};

const createRole = async (name) => {
  try {
    return await prisma.roles.create({
      data: {
        name,
      },
    });
  } catch (err) {
    return false;
  }
};

const updateRole = async (id, name) => {
  try {
    return await prisma.roles.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    return false;
  }
};

const deleteRole = async (id) => {
  try {
    return prisma.roles.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return false;
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  createRole,
};
