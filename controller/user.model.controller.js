const db = require("../models");
const response = require('../helpers/response.helper');
const { user } = require("../models");
require('../node_modules/dotenv');
const validator = require('../node_modules/validator');
const User = db.user;

exports.create = async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (firstname == null || firstname === " " || lastname == null || lastname === " " || mobile == null || mobile === " " || email == null || email === " " ||
        username == null || username === " " || password == null || password === " ") {
        if (validator.isEmpty(firstname) || validator.isEmpty(lastname) || validator.isEmpty(username) || validator.isAlphanumeric(password) || validator.isEmail(email)) {
            return response.responseHelper(res, false, "Invalid data passed", "Failed to process data");
        }
        return response.responseHelper(res, false, "All fields are required", "Fill every fields");
    }
    else {
        try {
            let result = await User.findOne({
                where: {
                    email: email,
                }
            })
            if (result) {
                return response.responseHelper(res, true, "Email already exists", "Chose another Email");
            }
            else {
                let result = await User.findOne({
                    where: {
                        mobile: mobile,
                    }
                })
                if (result) {
                    return response.responseHelper(res, true, "Mobile no already exists", "Chose another Mobile number");
                }
                else {
                    let result = await User.findOne({
                        where: {
                            username: username,
                        }
                    })
                    if (result) {
                        return response.responseHelper(res, true, "Username already exists", "Chose another Username");
                    }
                    else {
                        let result = await User.create(
                            {
                                firstname,
                                lastname,
                                mobile,
                                email,
                                username,
                                password
                            }
                        );
                        if (result) {
                            return response.responseHelper(res, true, "Signup Successfull", "User created successfully");
                        } else {
                            return response.responseHelper(res, false, "Signup failed", "Something went wrong");
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return response.responseHelper(res, false, "Signup Unsuccessfull", "Something went wrong");
        }

    }
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "No data given", "No data is given");
    }
  
}

exports.Login = async (req,res)=>{
        const username=req.body.username;
        const password=req.body.password;
        try {
            if(username == null || username === " " || password == null || password === " ")
            {
                return response.responseHelper(res, false, "Inavlid Data Entered","Please try again");
            }  
            try {
               let result= await User.findOne({
                    where:{
                        username:username,
                        password:password
                    }
                })
                if(!result)
                {
                    return response.responseHelper(res,false,"Login Failed","Username or Password must be wrong");
                }else{
                    return response.responseHelper(res,true,"Login Successful","Welcome...!!!");
                }
            } catch (error) {
                console.log(error);
                return response.responseHelper(res,true,"Something is wrong","Username or Password must be wrong");
            }
        } catch (error) {
            console.log(error);
            return response.responseHelper(res,true,"No data is given","No data is given to the api");
        }
       
}

exports.GetUsers = (req, res) => {
    User.findAll(
        console.log("All users:", JSON.stringify())
    ).then(result => {
        return response.responseHelper(res, true, result, "All records fetched successfully");
    }).catch(err => {
        console.log(err)
        return response.responseHelper(res, false, "Error !!");
    })

}


