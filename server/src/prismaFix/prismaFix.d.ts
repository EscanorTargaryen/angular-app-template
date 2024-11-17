export {};

import * as PrismaNamespace from "@prisma/client";

declare global {
  namespace globalThis {
    export import Prisma = PrismaNamespace;
  }
}
