import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = `mongodb+srv://paul:${process.env.MONGO_PASS}@cluster0.h2leh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async (): Promise<void> => {
  try {
    console.log(mongoURI);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("MongoDB connected");

    return;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
