const { MongoClient, ObjectId } = require("mongodb");

class ProductController {
    constructor() {
        this.conStr = "mongodb://localhost:27017"; // MongoDB connection string
        this.dbName = "simpleShop"; // Database name
        this.client = new MongoClient(this.conStr);
    }

    async connect() {
        try {
            console.log("Start connecting...");
            await this.client.connect(); // Establish connection
            console.log("Connected to MongoDB");
            this.db = this.client.db(this.dbName); // Select database
        } catch (err) {
            console.error("Connection failed", err);
            throw err;
        }
    }

    async disconnect() {
        await this.client.close(); // Close connection
        console.log("Disconnected from MongoDB");
    }

    async createProduct(product) {
        const collection = this.db.collection("products"); // Select collection
        const result = await collection.insertOne(product); // Insert document
        console.log("Product inserted", result.insertedId);
    }

    async getProducts() {
        const collection = this.db.collection("products"); // Select collection
        const products = await collection.find({}).toArray(); // Retrieve all documents
        console.log("Products:", products);
        return products;
    }

    async updateProduct(id, updatedData) {
        try {
            const collection = this.db.collection("products"); // Select collection
            const objectId = new ObjectId(id); // Convert string ID to ObjectId
            const result = await collection.updateOne(
                { _id: objectId }, // Find document by ID
                { $set: updatedData } // Update fields
            );
            console.log("Product updated", result.modifiedCount);
        } catch (error) {
            console.error("Invalid ID format:", error.message);
        }
    }

    async deleteProduct(id) {
        try {
            const collection = this.db.collection("products"); // Select collection
            const objectId = new ObjectId(id); // Convert string ID to ObjectId
            const result = await collection.deleteOne({ _id: objectId }); // Delete document
            console.log("Product deleted", result.deletedCount);
        } catch (error) {
            console.error("Invalid ID format:", error.message);
        }
    }
}

module.exports = ProductController; // Export class
