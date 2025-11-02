import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    adminID:{
        type : Number,
        required : true,
    },

    email:{
        type : String,
        required : true,
    },

    userName:{
        type : String,
        required : true,
    },

    password:{
        type : String,
        required : true,
    },
}, {
    timestamps : true,
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
