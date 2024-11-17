import {Router} from 'express';

const router = Router();

/*
Link another router
router.use("/editor", editorRouter)
*/

router.get('/test', (req, res) => {
  res.json({message: 'Hello World!'});
});

export default router;
