
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    prod_code:{
        type: String,
        required: true
    },
    status:{
        type: Number,
        required:true
    }
})

export default mongoose.model('Product', productSchema);