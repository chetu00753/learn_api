const express = require('express');
const router = express.Router();
const Controller=require('../controller/user.model.controller');
const db = require('../models');
const {responseHelper} = require("../helpers/response.helper");

router.get('/getUsers',Controller.GetUsers);

router.post('/signUp',Controller.create);

router.get('/login',Controller.Login);

module.exports=router;