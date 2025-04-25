"use strict";
//Here we will use deep-mocking using vitest-mock-extended libraray
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const vitest_mock_extended_1 = require("vitest-mock-extended");
exports.prisma = (0, vitest_mock_extended_1.mockDeep)();
//console.log(prisma.request);
