"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const __1 = require("..");
const supertest_1 = __importDefault(require("supertest"));
const db_1 = require("../__mocks__/db");
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
vitest_1.vi.mock("../db");
(0, vitest_1.describe)("Test the sum function", () => {
    (0, vitest_1.it)("Should return 3 when 1 + 2", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.prisma.request.create.mockResolvedValue({
            id: 1,
            answer: 3,
            type: "Sum",
            a: 1,
            b: 2,
        });
        const res = yield (0, supertest_1.default)(__1.app).post("/sum").send({
            a: 1,
            b: 2
        });
        (0, vitest_1.expect)(res.body.answer).toBe(3);
        (0, vitest_1.expect)(res.body.id).toBe(1);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
    }));
    (0, vitest_1.it)("Should fail when a number is big", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.app).post("/sum").send({
            a: 100000000,
            b: 100000000,
        });
        (0, vitest_1.expect)(res.body.message).toBe("Sorry we don't support big number");
        (0, vitest_1.expect)(res.statusCode).toBe(422);
    }));
});
(0, vitest_1.describe)("multiply", () => {
    (0, vitest_1.it)("Should return right if on value is 0 and another any a * b", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.app).post("/multiply").send({
            a: 0,
            b: 3,
        });
        (0, vitest_1.expect)(res.body.answer).toBe(0);
        (0, vitest_1.expect)(res.statusCode).toBe(200);
    }));
});
