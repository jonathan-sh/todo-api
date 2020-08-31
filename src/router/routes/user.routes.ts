import { Router, Request, Response } from 'express'
import UserModel from '../../model/user'
import { get } from 'lodash'
import jwt from '../../util/jwt'
import bcrypt from '../../util/bcrypt'

const routes = Router()
const path = '/user'

routes.post(`${path}/login`, (request: Request, response: Response) => {
    const email = get(request, ['body', 'email'], 'no email')
    const password = get(request, ['body', 'password'], 'no passwaord')
    const filter = { email: email.toLowerCase() }

    UserModel.findOne(filter)
        .then(found => {
            if (found && bcrypt.match(password, found.password)) {
                return found
            } else {
                throw { status: 401 }
            }
        })
        .then(validUser => {
            const token = jwt.generate(validUser._id)
            const name = validUser.name

            response.status(200).send({ token, name })
        })
        .catch(error => {
            const status = get(error, 'status', 500)
            if (status === 401) {
                response.status(status).send()
            } else {
                response.status(status).send(error)
            }
        })
})

const isEmailAlreadyRegistered = (request: Request) => {
    return UserModel.findOne({ email: request.body.email })
}

routes.post(path, async (request: Request, response: Response) => {
    const item = new UserModel(request.body)
    const isInvalidSchema = item.validateSync()

    if (isInvalidSchema) {
        response.status(406).send(isInvalidSchema)
    } else if (await isEmailAlreadyRegistered(request)) {
        const info = 'email already registered'
        response.status(400).send({ info })
    } else {
        item.password = bcrypt.encode(item.password)
        item.save()
            .then(saved => response.status(201).send(saved))
            .catch(error => response.status(500).send(error))
    }
})

export default routes
