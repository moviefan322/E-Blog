const sequelize = require("../config/connection");
const { User, Blog } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Blog.bulkCreate(blogData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
