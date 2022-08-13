const {
  getAllManufactures,
  getManufactureById,
  createManufacture,
  deleteManufacture,
  updateManufacture,
} = require("../../../repository/manufactures.repository");

const resolver = {
  Query: {
    manufactures: async (parent, args, context, info) => {
      return await getAllManufactures();
    },
    manufactureById: async (parent, args, context, info) => {
      return await getManufactureById(args.id);
    },
  },
  Mutation: {
    insertManufacture: async (parent, args, context, info) => {
      let { name, description, thumbail } = args;

      return (await createManufacture({ name, description, thumbail }))
        ? true
        : false;
    },
    updateManufacture: (parent, args, context, info) => {
      let { id, name, description, thumbail } = args;
      return updateManufacture({ id, name, description, thumbail })
        ? true
        : false;
    },
    deleteManufacture: (parent, args, context, info) => {
      return deleteManufacture(args.id) ? true : false;
    },
  },
};

module.exports = resolver;
