const express = require('express');
const router = express.Router();
const Ofertauno = require('../models/ofertauno');
const Ofertados = require('../models/ofertados');
const Ofertatres = require('../models/ofertatres');
//const Order = require('../models/order');

//router.get('/', async (req, res) => {
 // res.render('index');
//});

router.get('/', async (req, res) => {
  const ofertauno = await Ofertauno.find();
  const ofertados = await Ofertados.find();
  const ofertatres = await Ofertatres.find();
  res.render('index', { ofertauno, ofertados, ofertatres
  });
});



router.get('/contacto', async (req, res) => {
  res.render('contact');
});

router.get('/sobrenosotros', async (req, res) => {
  res.render('about');
});


router.get('/addtocardproduno/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Produno.findById(productId, function(err, product){
    if(err){
      return res-redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');

  });
});


router.get('/', function (req, res, next){
  if(!req.session.cart){
    return res.render('/', {products:null})
  }
  var cart = new Cart(req.session.cart);
  res.render('/', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});


module.exports = router;
