import mongoose from "mongoose";
const URL = `mongodb+srv://fypggclms:admin@cluster0.lf9nggn.mongodb.net/?retryWrites=true&w=majority`;
// const URL = `mongodb://localhost:27017`;

const dbConnect = async () => {
  console.log("trying to connect with : " + URL);
  try {
    const conn = await mongoose.connect(`${URL}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error while connecting to database", error.message);
  }
};
export default dbConnect;
