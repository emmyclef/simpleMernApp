'use strict';
var express = require('express');
var router = express.Router();

// Importing Model to set database to save the data
var Website = require('../models/website')


/* GET users listing. */
// router.get('/', function (req, res) {
//     res.send('respond with a resource');
// });


router.get('/', function (req, res) {
    Website.find({  })
    .then((data) => {
        console.log('Data:',data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error:', daerrorta);
    })
});


//Creating a post request to post data to the server from the client
router.post('/save', (req, res) =>{
    console.log('Body: ', req.body);
    const data = req.body;
       //saving to db
    const newWebPost = new Website(data);
    newWebPost
    .save((error)=> {
        if (error) {
            res.status(500).json({msg: 'Sorry, internal server errors'})
        } else {
            //webPost 
            res.json({
                msg:"We received your data!!!"
            });
            
            }
        }
    )

    //WebPost
});

module.exports = router;
