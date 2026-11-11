const Student = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    const data = req.body;
    try{
        const user = await Student.getOneByEmail(data.email);
        if (!user){
            throw new Error ('No user with this email')
        }

        const match = await bcrypt.compare(data.password, user.password);

        if (match){
            const payload = {email: user.email}
            const sendToken = (err, token) => {
                if (err) {
                    throw new Error ("Error in token generation")
                }
                res.status(200).json({success: true, token: token});
            }
            
            jwt.sign(payload, process.env.SECRET_TOKEN,{expiresIn: 3600}, sendToken)

        }else{
            throw new Error ('User cannot be authenticated')
        }

    } catch (err){
        res.status(401).json({error: err.message})
    }
}

module.exports = { login }   