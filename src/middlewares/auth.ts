import { Request, Response, NextFunction } from 'express'
import jwt from '../util/jwt'
import { get } from 'lodash'

export default interface CustomRequest extends Request { user_id?: string }

const checker = (request: CustomRequest, response: Response, next: NextFunction): void => {
    const isOptions = request.method === 'OPTIONS'
    if (isOptions) {
        next()
    } else {
        const token = `${request.headers['x-auth-token']}`
        const isAlow = jwt.check(token)

        if (isAlow) {
            request.user_id = get(isAlow, ['user_id'])
            request.body.user_id = request.user_id
            next()
        } else {
            const error = 'request not authenticated'
            response.status(401).send({ error })
        }
    }
}

export { checker }
