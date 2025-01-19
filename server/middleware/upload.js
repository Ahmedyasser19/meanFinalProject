import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs/promises";

// Configure Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set upload folder
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // Rename the uploaded file to avoid name collisions
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

// File Filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: fileFilter,
});

/* this function should upload the file to the cloud stourage 
  and return the link of the file to be passed as an image url 
  to be passed to the db 
*/
export default async function uploadImage(req, res, next) {
  try {
    const uploadSingle = upload.single("image");

    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Multer error: " + err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = req.file.path;

      try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          folder: "home/finalProject", // Replace with your desired Cloudinary folder
        });

        // Delete the temporary file from the server
        await fs.unlink(filePath);

        // Pass the Cloudinary URL to the next middleware
        req.body.imageUrl = uploadResult.secure_url;
        next();
      } catch (cloudError) {
        // Delete the temporary file if Cloudinary upload fails
        await fs.unlink(filePath);
        return res.status(500).json({
          error: "Cloudinary upload failed: " + cloudError.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
