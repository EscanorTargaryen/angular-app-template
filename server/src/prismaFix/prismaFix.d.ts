//fix from https://github.com/prisma/prisma/issues/5030
export {};

import * as PrismaNamespace from "@prisma/client";

declare global {
  namespace globalThis {
    export import Prisma = PrismaNamespace;
  }
}
