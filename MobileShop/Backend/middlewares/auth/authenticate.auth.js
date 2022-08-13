const jwt = require("jsonwebtoken");
const { decodeToken } = require("../../helper/jwt.helper");
const authenticate = (req, resp, next) => {
  try {
    const token = req.headers.authorization;
    let newToken = token.replace("Bearer", "").trim();
    const decoded = decodeToken(newToken);
    if (decoded != null) {
      console.log(decoded);
      next();
    } else {
      console.log("authorization is not auth");
      resp
        .status(401)
        .send({ message: "fail", status_code: 401, success: false });
    }
  } catch (error) {
    console.log("cannot find authorization in header");
    resp
      .status(401)
      .send({ message: "fail", status_code: 401, success: false });
  }
};

module.exports = {
  authenticate,
};
