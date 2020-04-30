// users schema

// reference mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define usersSchema
const UsersSchema = new Schema(
    {
        name: {type: String,required: true},
        email: {type: String,required: true},
        password: {type: String, required: true},
        date: {type: Date, default: Date.now}
    }
);

module.exports = mongoose.model('blogUser',UsersSchema);