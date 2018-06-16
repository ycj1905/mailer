const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchmea = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
})

mongoose.model('users', userSchmea);