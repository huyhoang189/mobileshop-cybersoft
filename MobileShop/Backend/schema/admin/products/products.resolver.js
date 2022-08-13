const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../../../repository/products.repository");

const resolver = {
  Query: {
    products: (parent, args, context, info) => {
      return getAllProducts();
    },
    productById: (parent, args, context, info) => {
      return getProductById(args.id);
    },
  },
  Mutation: {
    insertProduct: async (parent, args, context, info) => {
      let { name, thumbail, description, serie_id, count, price } = args;
      return (await createProduct({
        name,
        thumbail,
        description,
        count,
        price,
        serie_id,
      }))
        ? true
        : false;
    },
    updateProduct: async (parent, args, context, info) => {
      let { id, name, thumbail, description, serie_id, count, price } = args;
      return (await updateProduct({
        id,
        name,
        thumbail,
        description,
        serie_id,
        count,
        price,
      }))
        ? true
        : false;
    },
    deleteProduct: (parent, args, context, info) => {
      return deleteProduct(args.id) ? true : false;
    },
  },
};

module.exports = resolver;
