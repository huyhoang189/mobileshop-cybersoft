const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} = require("../../../repository/users.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../../../helper/jwt.helper");
const resolver = {
  Query: {
    users: async (parent, args, context, info) => {
      let users = await getAllUsers();
      return users;
    },
    userById: (parent, args, context, info) => {
      console.log(args);
      return getUserById(args.id);
    },
  },
  Mutation: {
    insertUser: (parent, args, context, info) => {
      let { username, name, password, role_id, phone_number } = args;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      return createUser({ username, name, hash, role_id, phone_number })
        ? true
        : false;
    },
    updateUser: (parent, args, context, info) => {
      let { id, username, name, password, role_id, phone_number } = args;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      return updateUser({ id, username, name, hash, role_id, phone_number })
        ? true
        : false;
    },
    deleteUser: (parent, args, context, info) => {
      console.log(args);
      return deleteUser(args.id) ? true : false;
    },
  },
};

module.exports = resolver;
