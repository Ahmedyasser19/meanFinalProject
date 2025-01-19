import productModel from "../models/product.js";
import Joi from "joi";

// Joi validation schemas
const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.min": "Product name must be at least 3 characters long",
    "string.max": "Product name must not exceed 100 characters",
    "any.required": "Product name is required",
  }),
  desc: Joi.string().min(10).max(500).required().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description must not exceed 500 characters",
    "any.required": "Description is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  imageUrl: Joi.string().uri().required().messages({
    "string.uri": "Image URL must be a valid URI",
    "any.required": "Image URL is required",
  }),
});

export async function getAllProducts(req, res) {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
}

// gets the user data from the middleware `req.user`
export async function addNewProduct(req, res) {
  try {
    // Validate input
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, desc, price, imageUrl } = req.body;
    const ownerId = req.user.id; // `req.user` is set by middleware

    const product = new productModel({
      name,
      desc,
      price,
      imageUrl,
      owner: ownerId,
    });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to create product " + error });
  }
}
// gets the user data from the middleware `req.user`
export async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const ownerId = req.user.id; // `req.user` is set by middleware

    // Validate input
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Fetch the product from the database
    const getProductDetails = await productModel.findById(productId);

    // Check if the product exists
    if (!getProductDetails) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the logged-in user is the owner of the product
    if (getProductDetails.owner.toString() !== ownerId) {
      return res.status(403).json({ message: "You do not own this product" });
    }

    // Proceed with updating the product details
    const { name, desc, price, imageUrl } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { name, desc, price, imageUrl },
      { new: true }
    );

    // Send the updated product in the response
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to update product: " + error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const ownerId = req.user.id; // `req.user` is set by middleware

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.owner.toString() !== ownerId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this product" });
    }

    await productModel.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete product " + error });
  }
}
