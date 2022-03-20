import mongoose from "mongoose";

// console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://irfandayan:dayan45@nodeappoauthdb.00ohc.mongodb.net/nodeappoauthdb?retryWrites=true&w=majority`
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
