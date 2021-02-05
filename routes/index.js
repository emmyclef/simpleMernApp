'use strict';
var express = require('express');
var router = express.Router();
var Lebsite = require('../models/website')

/* GET home page. */
// router.get('/', function (req, res) {
//     res.render('index', { title: 'Express' });
// });

// const data = {
//     title : "Welcome to Emmyclef Tutorials on Mongodb",
//     body: "to know the usage of Mongobd is done by practice of the application"
// }

router.get('/', function (req, res) {
    Lebsite.find({  })
    .then((data) => {
        console.log('Data:',data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error:', daerrorta);
    })
});

//Creating handling a post request to poost data to the server from the client
router.post('/save', (req, res) =>{
     console.log('Body: ', req.body)
     const data = req.body;


     const newWebPost = new Lebsite(data);
    newWebPost
    .save((error)=> {
        if (error) {
            res.status(500).json({msg: 'Sorry, internal server errors'})
        } else {
            //on browser console
            res.json({
                msg:"We received your data!!!"
            });       
        }
    }
    )
    
},

);

module.exports = router;
