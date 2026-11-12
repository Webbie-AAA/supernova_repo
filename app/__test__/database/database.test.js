//require('dotenv').config();
const db = require('../../database/connector');

describe('Student Database Tests', () => {

    test('SELECT - should find a student by email', async () => {
        const result = await db.query(
            'SELECT * FROM enrolled_students WHERE email = $1',
            ['minhein@gmail.com']
        );

        expect(result.rows.length).toBe(1);
        expect(result.rows[0].email).toBe('minhein@gmail.com');
    });

    test('INSERT - should register a new student', async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = `Test${Date.now()}`;

    const result = await db.query(
        `INSERT INTO enrolled_students
        (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        ['Test', 'Student', testEmail, testPassword]
    );

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].email).toBe(testEmail);
    });

    afterAll(async () => {
        await db.end();
    });

});