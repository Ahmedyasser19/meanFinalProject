import productModel from "../models/product.js";

export function getAllProducts(req, res) {
  res.send("Register route working!");
}
export async function addNewProduct(req, res) {
  try {
    const { name, desc, price, imageUrl } = req.body;
    const ownerId = req.user.id; // Assuming `req.user` is set by middleware

    const product = await productModel.create({
      name,
      desc,
      price,
      imageUrl,
      owner: ownerId,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to create product" });
  }
}
export function updateProduct(req, res) {
  res.send("Register route working!");
}
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming `req.user` is set by middleware

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this product" });
    }

    await productModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete product" });
  }
}
