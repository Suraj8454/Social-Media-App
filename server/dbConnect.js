MONGO_URI ="mongodb+srv://mallahsuraj816:v2abU6Dm9WG3dwre@cluster0.jasdkom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI);

    console.log(`DB connected : ${connect.connection.host}`);
    //console.log('connected');
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
};

module.exports = connectdb;
