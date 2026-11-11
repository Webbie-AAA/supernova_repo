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
        const response = await db.query("SELECT * FROM enrolled_students WHERE username = $1", [email]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate the student.");
        }
        return new Student(response.rows[0]);
    }

}

module.exports = Student;