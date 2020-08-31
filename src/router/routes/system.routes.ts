import { Router, Request, Response } from 'express'

const routes = Router()
const path = '/heath'

routes.get(path, (_: Request, reponse: Response) => reponse.send())

export default routes
