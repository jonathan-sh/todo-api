import { Router, Response, Request } from 'express'
import CustonRequest from '../../middlewares/auth'
import ProjectModel from '../../model/project'
import TaskModel from '../../model/task'
import { getUserEntityFilter } from '../../util/filter'

const routes = Router()
const path = '/project'

routes.get(path, async (request: CustonRequest, response: Response) => {
    const filter = { user_id: request.user_id }
    const found = await ProjectModel.find(filter)
    response.send(found)
})

routes.post(path, async (request: Request, response: Response) => {
    const item = new ProjectModel(request.body)
    const isInvalidSchema = item.validateSync()

    if (isInvalidSchema) {
        response.status(406).send(isInvalidSchema)
    } else {
        item.save()
            .then(saved => response.status(201).send(saved))
            .catch(error => response.status(500).send(error))
    }
})

routes.put(`${path}/:id`, (request: CustonRequest, response: Response) => {
    const toUpdate = request.body
    const filter = getUserEntityFilter(request)

    ProjectModel.updateOne(filter, toUpdate)
        .then(updated => response.send(updated))
        .catch(error => response.status(500).send(error))
})

routes.delete(`${path}/:id`, async (request: CustonRequest, reponse: Response) => {
    const filter = getUserEntityFilter(request)
    const deleteTasks = (): void => {
        const taskFilter = {
            project_id: filter._id,
            user_id: filter.user_id
        }
        TaskModel.deleteMany(taskFilter)
    }

    ProjectModel.deleteOne(filter)
        .then(deleted => {
            deleteTasks()
            reponse.send(deleted)
        })
        .catch(error => reponse.status(500).send(error))
})

export default routes
