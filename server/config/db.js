const mongoose = require("mongoose");

const connectDb = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/interview`,{});
        console.log("Db connected");
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDb;