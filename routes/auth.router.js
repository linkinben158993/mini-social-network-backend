const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");

const dataClientCanAccessWithToken = [
  {
    id: "client_01",
    domain: "http://localhost:8080/mini-q2a",
    token: null,
  },
];

router.post("/", function (req, res) {
  const client = req.body.client;

  var flag = false;
  dataClientCanAccessWithToken.forEach((e) => {
    if (e.id === client.id) {
      flag = true;
    }
  });

  if (flag === false) {
    return res.json({
      authenticated: false,
    });
  }

  const payload = {
    userId: client.id,
  };
  const options = {
    expiresIn: 10 * 60,
  };

  const accessToken = jsonwebtoken.sign(payload, "SECRET_KEY", options);

  return res.json({
    authenticated: true,
    accessToken,
  });
});

router.get("/", function (req, res) {});

module.exports = router;
