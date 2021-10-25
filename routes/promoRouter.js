const express = require('express');
const PromoRouter = express.Router();
const Promotions = require('../models/promotions');
const BodyParser = require('body-parser');

PromoRouter.use(BodyParser.json());

PromoRouter.route('/')
    .get((req, res, next)=>{
        Promotions.find({})
            .then((promotions) =>{
                res.statusCode = 200,
                console.log("Operation Successfull");
                res.json(promotions)
            }, (err) => next(err))
            .catch((err)=>next(err))
    })
    .put((req, res, next)=>{
        res.statusCode = 403;
        console.log("")
        res.end("Operation no supported /promotions")
    })
    .post((req, res, next)=>{
        Promotions.create(req.body)
            .then((promotions)=>{
                res.statusCode = 200;
                console.log("Create promotions successfull")
                res.json(promotions)
            }, (err)=>next(err))
            .catch((err)=>next(err))
    })
   .delete((req, res, next)=>{
       Promotions.remove({})
        .then((resp)=>{
            res.statusCode = 200;
            console.log('Delete All promotions is done');
            res.json(resp)
        }, (err)=>next(err))
        .catch((err)=>next(err))
   }) 

// get promotions ID
PromoRouter.route('/:promoId')
    .get((req, res, next)=>{
        Promotions.findById(req.params.promoId)
            .then((promo)=>{
                res.statusCode = 200;
                console.log("prmotion by Id : "+req.params.promoId);
                res.json(promo)
            }, (err)=>next(err))
            .catch((err)=>next(err))
    })
    .put((req, res, next)=>{
        Promotions.findByIdAndUpdate(req.params.promoId, {$set : req.body}, {new : true})
            .then((promo)=>{
                res.statusCode = 200;
                console.log("Update promotions is successfull : " + req.params.promoId);
                res.json(promo)
            },(err)=>next(err))
            .catch((err)=>next(err))
    })
    .post((req, res, next)=>{
        res.statusCode = 403;
        res.end("Operation no supported /promotions")
    })
    .delete((req, res, next)=>{
        Promotions.findByIdAndRemove(req.params.promoId)
                .then((resp)=>{
                    res.statusCode = 200;
                    console.log("Delete promotions by Id :" + req.params.promoId)
                    res.json(resp)
                },(err)=>next(err))
                .catch((err)=>next(err))
    })

module.exports = PromoRouter;