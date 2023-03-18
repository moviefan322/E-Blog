const router = require("express").Router();
const User = require("../models/User");

router.get("/users", async (req, res) => {
  try {
    const userData = await User.findAll();
    console.log(userData);
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
