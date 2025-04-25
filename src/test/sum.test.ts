import {describe,expect,it,vi} from "vitest";
import {app}  from "..";
import request from "supertest";
import { prisma } from "../__mocks__/db";

//Simple Mocking of database for unit test
// vi.mock("../db",()=>{
//     return{
//         prisma:{
//          request:{
//             create:vi.fn()
//          }
//         }
//     }
// });

//This above logic seperate in a __mocks__ folder so it will come from __mocks__/db.ts
vi.mock("../db");

describe("Test the sum function",()=>{
    it("Should return 3 when 1 + 2",async()=>{
         vi.spyOn(prisma.request,"create");
        prisma.request.create.mockResolvedValue({
            id:1,
            answer:3,
            type:"Sum",
            a:1,
            b:2,
        });
       
       const res= await request(app).post("/sum").send({
            a:1,
            b:2
        })
        
        expect(prisma.request.create).toHaveBeenCalledWith({
            data: {
                a: 1,
                b: 2,
                type:"Sum",
                answer:3,
            }
        });
        expect(res.body.answer).toBe(3);
        expect(res.body.id).toBe(1);
        expect(res.statusCode).toBe(200);
    })

    it("Should fail when a number is big",async()=>{
        const res= await request(app).post("/sum").send({
             a:100000000,
             b:100000000,
         })
         expect(res.body.message).toBe("Sorry we don't support big number");
         expect(res.statusCode).toBe(422);
     })
}); 

describe("multiply",()=>{
    it("Should return right if on value is 0 and another any a * b",async()=>{

        const res= await request(app).post("/multiply").send({
            a:0,
            b:3,
        })
        expect(res.body.answer).toBe(0);
        expect(res.statusCode).toBe(200);

    })
})
