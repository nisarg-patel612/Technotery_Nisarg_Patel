const Product = require("../Models/ProductModel");

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

exports.getProducts = async (req, res) => {
    res.json(await Product.find());
};

exports.getProduct = async (req, res) => {
    res.json(await Product.findById(req.params.id));
};

exports.updateProduct = async (req, res) => {
    let data = req.body;
    if(req.file) {
        data.image = req.file.path;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(product);
}

exports.deleteProduct = async (req,res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
        message: "Product deleted successfully"
    })
}