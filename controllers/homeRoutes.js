const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("homepage", { title: "Homepage" });
});

router.get("/about", async (req, res) => {
  res.render("about", { title: "About" });
});

module.exports = router;
