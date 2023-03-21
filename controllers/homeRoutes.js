const router = require("express").Router();
const { Blog, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const BlogData = await Blog.findAll();

    const displayPosts = BlogData.map((posts) => posts.get({ plain: true }));

    res.render("homepage", {
      title: "Homepage",
      displayPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/about", async (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
