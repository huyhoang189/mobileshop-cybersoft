const {
  getAllRoles,
  getRoleById,
  createRole,
  deleteRole,
  updateRole,
} = require("../../../repository/roles.repository");

const resolver = {
  Query: {
    roles: (parent, args, context, info) => {
      return getAllRoles();
    },
    roleById: (parent, args, context, info) => {
      return getRoleById(args.id);
    },
  },
  Mutation: {
    insertRole: (parent, param, context, info) => {
      return createRole(param.name) ? true : false;
    },
    updateRole: (parent, param, context, info) => {
      return updateRole(param.id, param.name) ? true : false;
    },
    deleteRole: (parent, param, context, info) => {
      return deleteRole(param.id) ? true : false;
    },
  },
};

module.exports = resolver;
