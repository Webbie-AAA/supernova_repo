const Student = require('../models/User')

async function login(req, res) {
    const data = req.body;
    try{
        const user = await Student.getOneByEmail(data.email);
        if (!user){
            throw new Error ('No user with this email')
        }        
        const match = data.password === user.password;
        if (match) {
            res.status(200).json({
                success: true,
                message: "Login successful"
            });
        } else {
            throw new Error('User cannot be authenticated')
        }

    } catch (err){
        res.status(401).json({error: err.message})
    }
}


module.exports = {login}
