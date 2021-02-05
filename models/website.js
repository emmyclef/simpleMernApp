const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const WebsiteSchema = new Schema({
    
        title: String,
        body: String,
        date: {
            type: String,
            default: Date.now()
        }
    
});

//Model of the database
const Website = mongoose.model('Website', WebsiteSchema);


module.exports = Website;