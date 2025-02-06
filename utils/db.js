import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl = "mongodb+srv://hridoy:hr1234@shil.m34eo.mongodb.net/?retryWrites=true&w=majority&appName=Shil";

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("DB connected successfully."))
    .catch((err) => console.log(err));
};


export default connectToDB;