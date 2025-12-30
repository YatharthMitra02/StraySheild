import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodbInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/strayShield`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected successfully at port 3000");
    console.log(
      `MongoDB is connected! Connected to ${mongodbInstance.connection.host}`
    );
  } catch (err) {
    console.error("Database failed to connect", err);
    process.exit(1);
  }
};

export default connectDB;