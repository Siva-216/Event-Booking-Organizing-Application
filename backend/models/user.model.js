import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    UserName : {
        type : String,
        required : true,
        unique : true
    },
    Email : {
        type : String,
        required : true,
        unique : true
    },
    Password : {
        type : String,
        required : true,
        minlength : 6
    },
    Gender : {
        type : String,
        required : true,
        enum : ['Male', 'Female']
    },
    ProfilePic : {
        type : String,
        default : ''
    },
    Admin:{
        type:Boolean,
        default:false
    },
    Organizer:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
    
});

const User = mongoose.model('User',UserSchema);

export default User;