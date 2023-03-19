const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "name",
      },
    },
  },
  {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sequelize,
    timestamps: true,
    modelname: "blog",
  }
);

module.exports = Blog;
