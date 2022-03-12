const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Product = require("../models/Product");
const mongoose = require("mongoose");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    const query = {};

    const products = await Product.find(query).populate("category", "title");

    return res.send(products);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.send(product);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError){
      return res.status(400).send(error);
    }
    return next(error);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const productData = {
      user: req.body.user,
      category: req.body.category,
      title: req.body.title,
      price: parseFloat(req.body.price),
      description: req.body.description,
      image: null,
    };

    if (req.file) {
      productData.image = req.file.filename;
    }

    const product = new Product(productData);

    await product.save();

    return res.send(product);
  } catch (e) {
    next(e);
  }
});

module.exports = router;