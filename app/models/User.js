const db = require('../database/connector')

class Student {

    constructor({ id, first_name, last_name, class_group, email, password }) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.class_group = class_group;
        this.email = email;
        this.password = password;
    }

    static async getOneByEmail(email) {
        const response = await db.query("SELECT * FROM enrolled_students WHERE email = $1;", [email]);

        if (response.rows.length != 1) {
            throw new Error("Unable to locate the student.");
        }
        return new Student(response.rows[0]);
    }

    static async createUserAccount(data){
        const {first_name, last_name, email, password} = data

        const response = await db.query("INSERT INTO enrolled_students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;", 
            [first_name, last_name, email, password])
            const newUser = response.rows[0]
            
    
            return new Student(newUser)
    }

}


module.exports = Student;