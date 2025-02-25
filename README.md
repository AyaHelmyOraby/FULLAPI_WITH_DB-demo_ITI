# MongoDB Connection and CRUD Operations

## Overview
This project demonstrates how to connect a Node.js application to MongoDB and perform basic CRUD (Create, Read, Update, Delete) operations.

## Prerequisites
- Node.js (v14 or later recommended)
- MongoDB installed and running (locally or on a cloud service like MongoDB Atlas)
- A basic understanding of JavaScript and Node.js

## Project Structure
```
📁 FullAPI with DB demo
 ├── 📄 app.js              # Main application file
 ├── 📄 ProductController.js # Database connection logic
 ├── 📄 package.json        # Dependencies
 ├── 📄 README.md           # Documentation
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-project-folder
   ```
3. Install dependencies:
   ```sh
   npm install mongodb
   ```

## Connecting to MongoDB
### `ProductController.js`
```js
const { MongoClient } = require("mongodb");

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
}

module.exports = ProductController; // Export class for use in app.js
```

## CRUD Operations
### Create a Product (ProductController.js)
```js
async function createProduct(product) {
    const collection = this.db.collection("products"); // Select collection
    const result = await collection.insertOne(product); // Insert document
    console.log("Product inserted", result.insertedId);
}
```

### Read Products (ProductController.js)
```js
async function getProducts() {
    const collection = this.db.collection("products"); // Select collection
    const products = await collection.find({}).toArray(); // Retrieve all documents
    console.log("Products:", products);
    return products;
}
```

### Update a Product (ProductController.js)
```js
async function updateProduct(id, updatedData) {
    const collection = this.db.collection("products"); // Select collection
    const result = await collection.updateOne(
        { _id: id }, // Find document by ID
        { $set: updatedData } // Update fields
    );
    console.log("Product updated", result.modifiedCount);
}
```

### Delete a Product (ProductController.js)
```js
async function deleteProduct(id) {
    const collection = this.db.collection("products"); // Select collection
    const result = await collection.deleteOne({ _id: id }); // Delete document
    console.log("Product deleted", result.deletedCount);
}
```

## Running the Application
### `app.js`
```js
const ProductController = require("./ProductController"); // Import controller

console.log("Test");
(async () => {
    const controller = new ProductController(); // Create instance
    await controller.connect(); // Connect to database
    
    // Example Usage
    await controller.createProduct({ name: "Laptop", price: 1200 }); // Create
    await controller.getProducts(); // Read
    await controller.updateProduct("productId", { price: 1100 }); // Update
    await controller.deleteProduct("productId"); // Delete
    
    await controller.disconnect(); // Disconnect from database
})();
```

## Running the Project
Start the application with:
```sh
node app.js
```
### Expected Output:
```
Test
Start connecting...
Connected to MongoDB
```
This confirms that the database connection is successful. 🎉

## Conclusion
This guide covers setting up MongoDB with Node.js, establishing a connection, and performing CRUD operations. You can extend this by adding error handling and advanced query features. 🚀

