const router = require("express").Router();
const { Blog, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const BlogData = await Blog.findAll({
      order: [["id", "DESC"]],
      include: { model: Comment },
    });

    const displayPosts = BlogData.map((posts) => posts.get({ plain: true }));

    res.render("homepage", {
      title: "Homepage",
      displayPosts,
      loggedIn: req.session.loggedIn,
      name: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/about", async (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Sign Up" });
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  try {
    const BlogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      order: [["id", "DESC"]],
      include: { model: Comment },
    });

    const displayPosts = BlogData.map((posts) => posts.get({ plain: true }));

    res.render("dashboard", {
      title: "Dashboard",
      loggedIn: req.session.loggedIn,
      displayPosts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newpost", async (req, res) => {
  try {
    res.render("newpost", {
      title: "New Post",
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      name: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
