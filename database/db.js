const mongoose = require("mongoose")

const connectDB = () => {
  mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).then(() => console.log("Mongo conectado"))
   .catch((err) => console.log(err))
};

module.exports = connectDB;


