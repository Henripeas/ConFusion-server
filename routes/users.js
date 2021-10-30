var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var Users = require('../models/users');


router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next){
    Users.findOne({username : req.body.username})
        .then((users)=>{
            if(users != null){
              const err = new Error("User " + req.body.username + " already exists");
              err.statusCode = 403;
              next(err);

            }else{
              return Users.create({
                username : req.body.username,
                password : req.body.password
              })

            }

        }, (err) => next(err))
        .then((users)=>{
          res.statusCode = 200;
          res.json({status : 'Registration Successfull', users: users})
        }, (err) => next(err))
        .catch((err) => next(err))
});

router.post('/login', function(req, res, next){

  if(!req.session){
    var authHeaders = req.headers.authorization;

  if(!authHeaders){
    var err = new Error("You are not AUthenticated");
    res.setHeader('WWW-Authenticate','Basic');
    err.status = 401;
    return next(err);
  }
  var auth = new Buffer.from(authHeaders.split(' ')[1], 'base64').toString().split(':');
  var username = auth[0];
  var password = auth[1];

  Users.findOne({username : username})
    .then((user)=>{
        if(user === null){
          var err = new Error("User " + username + " does not existe ");
          err.status = 403;
          return next(err);
        }else if(user.password !== password){
          var err = new Error("Your Password is not correct ");
          err.status = 403;
          return next(err);
        }
        else if(user.username == username && user.password == password){
          req.session = 'authenticated';
          res.statusCode = 200;
          res.send('You are authenticated')
         }
    },(err)=>next(err))
    .catch((err)=>next(err))
  }else{
    res.statusCode = 200;
    res.send('You are already authenticated ')
  }
});

router.get('/logout', function(req, res, next){
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else{
    var err = new Error("Your are not logger in !");
    err.status = 403;
    return next(err)
  }
})


module.exports = router;
