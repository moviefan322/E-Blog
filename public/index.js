require("./images");
require("./css");

app.use("/images", express.static(path.join(__dirname, "/public/images")));
