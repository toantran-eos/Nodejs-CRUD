import mongoose, { Promise } from "mongoose";

mongoose.Promise = Promise.global;

var loginSchema = new mongoose.Schema({
    email:{type:String, required: true},
    password:{type: String, required:true}
});
loginSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5), null);
};
loginSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('Login',loginSchema);