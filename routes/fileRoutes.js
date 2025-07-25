// 📁 File: routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const { uploadExcel, getHistory } = require("../controllers/fileController");
const { protect } = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/upload", protect, upload.single("file"), uploadExcel);
router.get("/history", protect, getHistory);

module.exports = router;
