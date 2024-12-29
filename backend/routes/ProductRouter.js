const ensureAuthenticated = require("../middlewares/Auth");

const router = require("express").Router();
const data = [
  {
    name: "laptop",
    price: 200000,
  },
  {
    name: "Moblie",
    price : 20000
  }
];

router.get("/getProduct", ensureAuthenticated, (req, res) => {
  res.status(201).json({data});
});

module.exports = router;
