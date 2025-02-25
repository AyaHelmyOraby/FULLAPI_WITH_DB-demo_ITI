const ProductController = require("./ProductController"); // Import controller

console.log("Test");

(async () => {
    const controller = new ProductController(); // Create instance
    await controller.connect(); // Connect to database

    // Example Usage
    await controller.createProduct({ name: "Laptop", price: 1200 }); // Create
    await controller.getProducts(); // Read
    await controller.updateProduct("653a1b0f2b5eaf001fa62cdd", { price: 1100 }); // Update
    await controller.deleteProduct("653a1b0f2b5eaf001fa62cdd"); // Delete

    await controller.disconnect(); // Disconnect from database
})();
