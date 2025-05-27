const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://ryanvankriekinge:ryanvankriekinge@cluster0.ytt78f6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connectToDB() {
    try {
        await client.connect();
        db = client.db("Codeucation");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

function getDB() {
    if (!db) throw new Error("Database not initialized. Call connectToDB first.");
    return db;
}

module.exports = {
    connectToDB,
    getDB
};
