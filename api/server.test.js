const request = require("supertest")
const db = require("../data/dbConfig.js")
const server = require("./server.js")

const Brandon = {name: "Brandon"}
const Amanda = {name: "Amanda"}

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db("people").truncate()
})

afterAll(async ()=>{
    await db.destroy()
})

describe("server", ()=>{
    describe("[GET] /people", ()=>{
        it("responds with 200 status", async ()=>{
            const res = await request(server).get("/people")
            expect(res.status).toBe(200)
        })
        it("returns correct num of people", async ()=>{
            let res
            await db("people").insert(Brandon)
            res = await request(server).get("/people")
            expect(res.body).toHaveLength(1)
            //expect(res.body).toEqual({})

            await db("people").insert(Amanda)
            res = await request(server).get("/people")
            expect(res.body).toHaveLength(2)
        })
        it("returns correct person format", async ()=>{
            await db("people").insert(Brandon)
            await db("people").insert(Amanda)
            const res = await request(server).get("/people")
            expect(res.body[0]).toMatchObject({id:1,...Brandon})
            expect(res.body[1]).toMatchObject({id:2,...Amanda})
        })
    })
    describe("[POST] /people", ()=>{
        it("responds with  newly created person", async ()=>{
            let res
            res = await request(server).post("/people").send(Brandon)
            expect(res.body).toMatchObject({id:1,...Brandon})

            res = await request(server).post("/people").send(Amanda)
            expect(res.body).toMatchObject({id:2,...Amanda})
        })
    })
})