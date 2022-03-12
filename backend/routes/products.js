const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Product = require("../models/Product");
const mongoose = require("mongoose");
const authorization = require("../middleware/auth");

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

    if(req.query.category){
      query.category = {_id: req.query.category};
      const productsByCategory = await Product.find(query).populate("user", "name token");

      return res.send(productsByCategory);
    }
    const products = await Product.find();

    return res.send(products);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError){
      return res.status(400).send(error);
    }
    return next(error);
  }
});

router.post('/', authorization, upload.single('image'), async (req, res, next) => {
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
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError){
      return res.status(400).send(error);
    }
    return next(error);
  }
});

router.delete('/:id', upload.single('image'), async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove({_id: req.params.id});

    await product.save();

    return res.send(product);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError){
      return res.status(400).send(error);
    }
    return next(error);
  }
});

module.exports = router;