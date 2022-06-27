import joi from "joi";
import bcrypt from 'bcrypt';
import lodash from 'lodash';
import Users from '../models/Users.js';
import express from 'express';
const router = express.Router();

router.post('/auth', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their email address
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
        return res.status(400).send('Incorrect email or password.');
    }

    res.send(true);
});

function validate(req) {
    const schema = {
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    };

    return validate;
}


export default router;