const { getUserByUserName } = require("../../../repository/users.repository");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../../helper/jwt.helper");
const resolver = {
  Query: {
    test: () => {
      return "test";
    },
  },

  Mutation: {
    login: async (parent, args, context, info) => {
      let { username, password } = args;
      let user = await getUserByUserName(username);
      if (user) {
        let isAuth = bcrypt.compareSync(password, user.password);
        if (isAuth) {
          let token = generateToken({
            username: user.username,
            role: user.role,
          });

          let resp = {
            token: token,
            role_name: user.role.name,
          };
          return resp;
        }
      }
      return {
        token: "NOT FOUND",
        role_name: null,
      };
    },
  },
};

module.exports = resolver;
