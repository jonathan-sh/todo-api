import { Router, Response, Request } from 'express'
import { get } from 'lodash'

import CustonRequest from '../../middlewares/auth'
import TaskModel from '../../model/task'
import ProjectModel from '../../model/project'
import { getUserEntityFilter } from '../../util/filter'

const routes = Router()
const path = '/task'

routes.get(`${path}/:project_id`, async (request: CustonRequest, response: Response) => {
    const filter = {
        user_id: request.user_id,
        project_id: request.params.project_id
    }
    const found = await TaskModel.find(filter)
    response.send(found)
})

const isValidProject = async (request: Request): Promise<any> => {
    const filterProject = {
        user_id: get(request, ['body', 'user_id']),
        _id: get(request, ['body', 'project_id'])
    }

    return ProjectModel.findOne(filterProject)
}

routes.post(path, async (request: Request, response: Response) => {
    const item = new TaskModel(request.body)
    const isInvalidSchema = item.validateSync()

    if (isInvalidSchema) {
        response.status(406).send(isInvalidSchema)
    } else if (await isValidProject(request)) {
        item.save()
            .then(saved => response.status(201).send(saved))
            .catch(error => response.status(500).send(error))
    } else {
        const info = 'we can\'t create this task on this projec'
        response.status(400).send({ info })
    }
})

routes.put(`${path}/:id`, (request: CustonRequest, response: Response) => {
    const toUpdate = request.body
    const filter = getUserEntityFilter(request)

    TaskModel.updateOne(filter, toUpdate)
        .then(updated => response.send(updated))
        .catch(error => response.status(500).send(error))
})

routes.delete(`${path}/:id`, (request: CustonRequest, reponse: Response) => {
    const filter = getUserEntityFilter(request)

    TaskModel.deleteOne(filter)
        .then(deleted => reponse.send(deleted))
        .catch(error => reponse.status(500).send(error))
})

export default routes
