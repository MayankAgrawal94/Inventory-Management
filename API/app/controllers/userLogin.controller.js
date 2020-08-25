const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 17;
var jwt = require('jwt-simple');  // https://www.npmjs.com/package/jwt-simple

const secretConfig = process.env.JWT_SECRET



// Find a single user with a email
exports.login = (req, res) => {
    User.findOne({
      where: {
        usr_email : req.body.email
      }
    }).then(user => {
        if(!user) {
            return res.status(200).send({
                message: "User not found with email : " + req.body.email
            });            
        }

        // Load hash from your password DB.
        if(bcrypt.compareSync(req.body.password, user.usr_password)){

            var loginTime = Date.now()
            var token = jwt.encode({
                user_id: user.rec_id,
                user_email : user.usr_email,
                user_name : user.usr_name,
                login_time : loginTime
            }, secretConfig);
            var tokenObj = {
                token : token
            }

            res.status(200).send({
                error : false,
                message : 'Login successful.',
                body : tokenObj
            });

        }else{
            res.status(200).send({
                error : true,
                message : 'Invalid credentails!'
            });
        }
    }).catch(err => {
        console.log(err)
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with email : " + req.body.email
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with email : " + req.body.email
        });
    });
};


exports.session = (req, res) => {
    res.status(200).send({
        error : false,
        message : 'session can cont.',
    });
}