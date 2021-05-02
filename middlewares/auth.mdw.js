const jsonwebtoken = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const accessToken = req.headers["x-access-token"];
  if (accessToken) {
    try {
      const decoded = jsonwebtoken.verify(accessToken, "SECRET_KEY");
      console.log(decoded);

      req.accessTokenPayload = decoded;

      next();
    } catch (er) {
      console.log(er);
      return res.status(401).json({
        message: "Invalid access token!",
      });
    }
  } else {
    return res.status(400).json({
      message: "Access token not found!",
    });
  }
};
