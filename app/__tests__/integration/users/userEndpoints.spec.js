const request = require('supertest');
const app = require('../../../app');
const {resetTestDB} = require('./config')


describe('Users API Endpoints', () => {
    let api

    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(()=>{
        api = app.listen(4000, ()=>{
            console.log('Test server running on port 4000')
        })
    })

    afterAll((done)=>{
        console.log('Server is closing')
        api.close(done)
    })

    describe('POST /users/register', ()=>{
        it('should create a new enrolled_student role with all the entered values and a new id', async ()=>{
            const newStudent = {first_name: 'Susia', last_name: 'May', email: `susie_${Date.now()}@outlook.com`, password: `susie${Date.now()}`};
            const response = await request(api)
                .post('/users/register')
                .send(newStudent)
                .set('Accept', 'application/json')
    
            expect(response.status).toEqual(201);
            expect(response.body.email).toEqual(newStudent.email);
            expect(response.body.first_name).toEqual(newStudent.first_name);
            expect(response.body.last_name).toEqual(newStudent.last_name);
            expect(response.body.password).toEqual(newStudent.password);
        });

        it('rejects an incomplete payload with 400', async () => {
            const res = await request(api)
                .post('/users/register')
                .send({name: "only sent name excluding other fields"});

            expect(res.status).toBe(400);
            
        })
    });

    // describe('POST /users/login', ()=>{
    //     it('should retrieve an enrolled_student with a matching email and password', async()=>{
    //         const response = await request(api).post('/users/login')
    //         console.log(`RESPONSE BODY: ${response.body}`)
    //         console.log(response.body)
    //     })
    // })


});