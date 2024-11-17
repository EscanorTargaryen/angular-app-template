//fix from https://github.com/prisma/prisma/issues/5030
import type {PrismaClient as PrismaClientType} from '@prisma/client';
import {createRequire} from 'module';

const require = createRequire(import.meta.url ?? __filename);

const {PrismaClient: PrismaClientImpl} = require('@prisma/client');

export class PrismaClient extends (PrismaClientImpl as typeof PrismaClientType) {
}
