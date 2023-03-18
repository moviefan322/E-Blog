const router = require("express").Router();
const User = require("../models/User");

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

module.exports = router;