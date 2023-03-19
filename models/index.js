const User = require("./User");
const Blog = require("./Blog");

User.hasMany(Blog, {
  foreignKey: "author_name",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "author_name",
});

module.exports = { User, Blog };
