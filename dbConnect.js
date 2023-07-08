import mongoose from "mongoose";
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error while connecting to database", error);
    };
};
export default dbConnect;