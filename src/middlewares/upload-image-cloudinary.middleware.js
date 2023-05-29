import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const uploadImageCloudinaryMiddleware = (req, res, next) => {
  upload.single("picture")(req, res, (error) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "File upload error" });
    }
    if (!req.file) {
      return next();
    }
    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Error downloading the file on Cloudinary" });
      }
      unlinkSync(req.file.path);

      req.picture = result.secure_url;
      next();
    });
  });
};
