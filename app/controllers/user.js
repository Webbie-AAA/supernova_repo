const Student = require('../models/User')

async function login(req, res) {
    const data = req.body;
    console.log(data)
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

async function register(req, res){
    try {
        const data = await Student.createUserAccount(req.body)
        console.log(data)
        res.status(201).send(data);
    } catch (err) {
        res.status(400).json({error: err.message})
    }

}

module.exports = {register, login}
