const mongoose = require('mongoose');

const uri = "mongodb+srv://ryanvankriekinge:ryanvankriekinge@cluster0.ytt78f6.mongodb.net/Codeucation?retryWrites=true&w=majority";

async function connectToDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDB with Mongoose");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

module.exports = {
    connectToDB
};