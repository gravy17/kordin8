import { Router, Request, Response, NextFunction } from 'express'
const router = Router()

router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send('you\'ve hit the users route')
})

export default router
