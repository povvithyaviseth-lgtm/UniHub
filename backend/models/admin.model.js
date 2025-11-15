import mongoose from 'mongoose';

const adminModel = new mongoose.Schema({
    email:{
        type : String,
        required : true,
    },

    userName:{
        type : String,
        required : false,
    },

    password:{
        type : String,
        required : true,
    },
}, {
    timestamps : true,
});

const Admin = mongoose.model('Admin', adminModel);

export default Admin;