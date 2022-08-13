const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
  try {
    return await prisma.users.findMany({
      include: {
        role: true, // Return all fields
      },
    });
  } catch (err) {
    return false;
  }
};

const getUserById = async (id) => {
  try {
    return await prisma.users.findUnique({
      where: {
        id,
      },
      include: {
        role: true, // Return all fields
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserByUserName = async (username) => {
  try {
    return await prisma.users.findFirst({
      where: {
        username,
      },
      include: {
        role: true, // Return all fields
      },
    });
  } catch (error) {}
};

const createUser = async (user) => {
  try {
    return await prisma.users.create({
      data: {
        name: user.name,
        password: user.hash,
        username: user.username,
        role_id: user.role_id,
        phone_number: user.phone_number,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateUser = async (user) => {
  try {
    return await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        password: user.hash,
        username: user.username,
        role_id: user.role_id,
        phone_number: user.phone_number,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteUser = async (id) => {
  try {
    return await prisma.users.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return false;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getUserByUserName,
};
