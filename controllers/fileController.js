// 📁 File: controllers/fileController.js
const Upload = require("../models/upload");
const xlsx = require("xlsx");

exports.uploadExcel = async (req, res, next) => {
  try {
    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const upload = await Upload.create({
      user: req.user._id,
      fileName: file.originalname,
      data,
    });

    res.status(201).json(upload);
  } catch (err) {
    next(err);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const uploads = await Upload.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(uploads);
  } catch (err) {
    next(err);
  }
};
