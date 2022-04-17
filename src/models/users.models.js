const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    lastname: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true,
        index: true
    },
    birthdate: Date,
    /* password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    enable:{
        type: Boolean,
        required: true,
        default: true
    } */
},
    { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);