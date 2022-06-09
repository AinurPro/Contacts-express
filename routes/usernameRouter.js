const express = require('express')
const usernameModel = require('../models/usernameSchema')
const {check, validationResult} = require('express-validator')
const router = express.Router()

router.post('/', [check('username', "Username is required!!!").notEmpty(),
check('email', "Please enter a valid email").isEmail(), check('phone', "Please put phone number!").notEmpty(), check('contactType', "default").default(), check('password', "Please use at least 7 characters and symbols!").isLength({min: 7})], async(req, res)=> {
    const usernameData = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json(errors.array())
    }
    try {
        const username = await usernameModel.create(usernameData)
        res.status(201).json(username)
    } catch (error) {
        console.log(error)
        res.status(400).json('Bad request!!!')
    }

})
module.exports = router