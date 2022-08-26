import { Router, Request, Response, NextFunction } from 'express'
const router = Router()

router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('you\'ve hit the server. We should serve you api docs here')
})

export default router
