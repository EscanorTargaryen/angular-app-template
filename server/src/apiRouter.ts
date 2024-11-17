import {Router} from 'express';
import {PrismaClient} from './prismaFix/prismaFix';

const router = Router();

export const prisma = new PrismaClient()

/*
Link another router
router.use("/editor", editorRouter)
*/

router.get('/test', (req, res) => {
  res.json({message: 'Hello World!'});
});

export default router;
