import express from 'express';
import { createCourse , getAllCourse, SingleCourse, updateCourse, deleteCourse} from '../controllers/courseController.js';
import { createProduct ,getAllProduct, getDetailProduct, editProduct, delProduct} from '../controllers/productController.js';
import Users from '../models/Users.js';
import { validateUser } from '../models/Users.js';
import bcrypt from 'bcrypt';
import lodash from 'lodash';

const router = express.Router();

router.post('/insert-user', async(req,res)=>{
    const {error} = validateUser(req.body);

    if(error){
        return res.status(400).send(error.detail[0].message);
    }

    let user = await Users.findOne({email: req.body.email});
    if(user){
        return res.status(400).send('That user already exist!');
    }else{
        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user = new user(lodash.pick(req.body, ['username', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);

        await user.save();
        res.send(lodash.pick(user,['_id','username','email']));
    }
});
export default router;