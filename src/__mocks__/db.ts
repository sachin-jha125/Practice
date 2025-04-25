//Here we will use deep-mocking using vitest-mock-extended libraray

import { PrismaClient } from "@prisma/client";
import {mockDeep} from "vitest-mock-extended";

export const prisma=mockDeep<PrismaClient>();