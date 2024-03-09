import mongoose from "mongoose";


const Connection = async (USERNAME,PASSWORD) => {
    try {
        await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.jyuljvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("db connected successfully");
    } catch (e) {
        console.log("error", e);
    }
};

export default Connection;
