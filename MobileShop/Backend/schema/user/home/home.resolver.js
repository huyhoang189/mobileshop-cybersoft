const {
  getAllManufactures,
  getManufactureByName,
} = require("../../../repository/manufactures.repository");

const { getAllProducts } = require("../../../repository/products.repository");
const { getSerieById } = require("../../../repository/series.repository");

const resolver = {
  Query: {
    manufactures: async (parent, args, context, info) => {
      return await getAllManufactures();
    },
    products: async (parent, args, context, info) => {
      return await getAllProducts();
    },
    productsMultiSearch: async (parent, args, context, info) => {
      let { input } = args;
      let { manufactures, keyword, rangePrice, sort } = input;
      let products = [];
      //filter by manufature
      if (manufactures.length > 0) {
        for (let manufacture of manufactures) {
          let manufactureTemp = await getManufactureByName(manufacture);
          if (manufactureTemp.serie.length > 0) {
            for (let serie of manufactureTemp.serie) {
              let serieTemp = await getSerieById(serie.id);
              if (serieTemp.product.length > 0) {
                for (let product of serieTemp.product) {
                  products.push(product);
                }
              }
            }
          }
        }
      } else {
        products = await getAllProducts();
      }

      //filter by keyword
      if (keyword) {
        products = await products.filter((e) => {
          return e.name.toUpperCase().includes(keyword.toUpperCase());
        });
      }

      //filter by price range
      if (rangePrice) {
        switch (rangePrice) {
          case 1:
            break;
          case 2: {
            products = await products.filter((e) => {
              let price = Number.parseInt(e.price)
                ? Number.parseInt(e.price)
                : 0;
              let status_price = price <= 2000000;
              return status_price;
            });
            break;
          }
          case 3: {
            products = products.filter((e) => {
              return (
                Number.parseInt(e.price) > 2000000 &&
                Number.parseInt(e.price) <= 4000000
              );
            });
            break;
          }
          case 4: {
            products = await products.filter((e) => {
              return (
                Number.parseInt(e.price) > 4000000 &&
                Number.parseInt(e.price) <= 7000000
              );
            });
            break;
          }
          case 5: {
            products = await products.filter((e) => {
              return (
                Number.parseInt(e.price) > 7000000 &&
                Number.parseInt(e.price) <= 13000000
              );
            });
            break;
          }
          case 6: {
            products = await products.filter((e) => {
              return (
                Number.parseInt(e.price) > 13000000 &&
                Number.parseInt(e.price) <= 20000000
              );
            });
            break;
          }
          case 7: {
            products = await products.filter((e) => {
              return Number.parseInt(e.price) > 20000000;
            });
            break;
          }
          default:
            break;
        }
      }

      //sort by price
      if (sort) {
        products = await products.sort((a, b) => {
          let price_a = Number.parseInt(a.price) ? Number.parseInt(a.price) : 0;
          let price_b = Number.parseInt(b.price) ? Number.parseInt(b.price) : 0;
          if (sort == "DESC") {
            return price_a - price_b;
          } else return price_b - price_a;
        });
      }
      return products;
    },
  },
};

module.exports = resolver;
