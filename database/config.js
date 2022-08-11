const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CONN);
    console.log("DB ONLINE");
  } catch (err) {
    console.log(err);
    throw new Error("Error al inicializar la BD");
  }
};

module.exports = dbConnection;

/* 
const Cat = mongoose.model("Cat", { name: String });

const kitty = new Cat({ name: "Zildjian" });
kitty.save().then(() => console.log("meow")); */
