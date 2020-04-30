// blog schema

// reference mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define BlogSchema
const BlogSchema = new Schema(
    {
        title: {type: String,required: true},
        author: {type: String,required: true},
        body: {type: String, required: true},
        date: {type: Date, default: Date.now}
    }
);

module.exports = mongoose.model('blog',BlogSchema);