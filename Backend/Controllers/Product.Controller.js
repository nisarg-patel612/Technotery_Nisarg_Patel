const Product = require("../Models/ProductModel");

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product  = await Product.create({
            ...req.body,
            image: req.file.path
        })
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    res.json(await Product.find());
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
    res.json(await Product.findById(req.params.id));
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    let data = req.body;
    if(req.file) {
        data.image = req.file.path;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(product);
}

// Delete a product by ID
exports.deleteProduct = async (req,res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
        message: "Product deleted successfully"
    })
}