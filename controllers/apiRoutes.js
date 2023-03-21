const router = require("express").Router();
const { User, Blog } = require("../models");

router.get("/users", async (req, res) => {
  try {
    const UserData = await User.findAll();
    console.log(UserData);
    res.status(200).json(UserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const UserData = await User.findByPk(req.params.id);
    if (!UserData) {
      return res.status(404).json({ message: "Could not find user!" });
    }
    console.log(UserData);
    res.status(200).json(UserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/users", async (req, res) => {
  try {
    const UserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({ message: "User created!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const UserData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!UserData[0]) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }
    res.status(200).json({ message: "User updated!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const UserData = User.destroy({ where: { id: req.params.id } });
    if (!UserData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "User not found!" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json({ message: "Login Successful!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/users/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/blogs", async (req, res) => {
  try {
    const BlogData = await Blog.findAll();
    console.log(BlogData);
    res.status(200).json(BlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/blogs/:id", async (req, res) => {
  try {
    const BlogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!BlogData[0]) {
      res.status(404).json({ message: "No blog with this id!" });
      return;
    }
    res.status(200).json(BlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const BlogData = await Blog.findByPk(req.params.id);
    if (!BlogData) {
      return res.status(404).json({ message: "Could not find post!" });
    }
    console.log(BlogData);
    res.status(200).json(BlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/blogs", async (req, res) => {
  try {
    const BlogData = await Blog.create({
      author_name: req.body.author_name,
      subject: req.body.subject,
      post: req.body.post,
    });
    res.status(200).json({ message: "Blog created!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/blogs/:id", async (req, res) => {
  try {
    const BlogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!BlogData[0]) {
      res.status(404).json({ message: "No blog with this id!" });
      return;
    }
    res.status(200).json({ message: "Blog updated!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/blogs/:id", async (req, res) => {
  try {
    const BlogData = Blog.destroy({ where: { id: req.params.id } });
    if (!BlogData) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post Deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
