const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("homepage");
});

//GET ALL USERS

module.exports = router;
