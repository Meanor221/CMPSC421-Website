
var express = require('express');
var router = module.exports = express.Router();

var aws = require('aws-lib');

router.get('/search', function(req, res, next) {
  var access = req.query.access;
  var secret = req.query.secret;
  var associate = req.query.associate;
  var search = req.query.search;

  var client = aws.createProdAdvClient(access, secret, associate);
  var query = {SearchIndex: 'Books'};

  // if(search.length === 10 || search.length === 13) {
  //   // search by ISBN
  // } else if(search.length === 10) {
  //   // search by ASIN
  // } else {
  //   // search by title
  // }
  // http://docs.aws.amazon.com/AWSECommerceService/latest/DG/ItemSearch.html
  query.Keywords = search;

  client.call("ItemSearch", query, function(error, results) {
    if(error) return res.status(400).json({message: error.message});
    res.json(results);
  });
});

router.use(express.static(__dirname));

