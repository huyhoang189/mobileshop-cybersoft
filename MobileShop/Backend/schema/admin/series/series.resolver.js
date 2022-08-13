const {
  getAllSeries,
  getSerieById,
  createSerie,
  deleteSerie,
  updateSerie,
} = require("../../../repository/series.repository");

const resolver = {
  Query: {
    series: async (parent, args, context, info) => {
      return await getAllSeries();
    },
    serieById: (parent, args, context, info) => {
      return getSerieById(args.id);
    },
  },
  Mutation: {
    insertSerie: async (parent, args, context, info) => {
      let { name, sort_name, manufacture_id } = args;

      return (await createSerie({ name, sort_name, manufacture_id }))
        ? true
        : false;
    },
    updateSerie: async (parent, args, context, info) => {
      let { id, name, sort_name, manufacturer_id } = args;
      return (await updateSerie({ id, name, sort_name, manufacturer_id }))
        ? true
        : false;
    },
    deleteSerie: async (parent, args, context, info) => {
      return (await deleteSerie(args.id)) ? true : false;
    },
  },
};

module.exports = resolver;
