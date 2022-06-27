import mongoose from "mongoose";
import joi from "joi";

// const joi = joi();

const userSchema = new mongoose.Schema({
    username:{type:String, required: true, minlength: 5, maxlength: 50},
    email:{type:String,required:true, minlength: 5, maxlength: 255, unique: true},
    password:{type:String, required: true, minlength: 8, maxlength:1024},
})

export function validateUser(user){
        const Schema= joi.object({
        username: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    });
   
    return validateUser;
}


export default mongoose.model('User', userSchema);