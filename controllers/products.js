const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('Products').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res, next) => {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('Products').find({ _id: productId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createProduct = async (req, res, next) => {
    const product = {
        ProductName: req.body.ProductName,
        Description: req.body.Description,
        Category: req.body.Category,
        Price: req.body.Price,
        Stock: req.body.Stock
    };
    const result = await mongodb.getDb().db().collection('Products').insertOne(product);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'Failed to create the product.');
    }
};

const updateProduct = async (req, res, next) => {
    const productId = new ObjectId(req.params.id);
    const product = {
        ProductName: req.body.ProductName,
        Description: req.body.Description,
        Category: req.body.Category,
        Price: req.body.Price,
        Stock: req.body.Stock
    };
    const result = await mongodb.getDb().db().collection('Products').replaceOne({ _id: productId }, product);
    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result.error || 'Failed to update the product.');
    }
};

const deleteProduct = async (req, res, next) => {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('Products').deleteOne({ _id: productId });
    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result.error || 'Failed to delete the product.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};