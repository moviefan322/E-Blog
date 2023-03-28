const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("eblog_db", "root", "tesseradecades", {
  host: "localhost",
  dialect: "mysql",
});

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
});

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
});

Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});

module.exports = { User, Blog, Comment };
