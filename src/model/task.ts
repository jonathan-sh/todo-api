import { createSchema, Type, typedModel } from 'ts-mongoose'

const TaskSchema = createSchema(
    {
        name: Type.string({ required: true }),
        project_id: Type.string({ required: true }),
        user_id: Type.string(),
        finished: Type.boolean({ default: false })
    },
    { timestamps: { createdAt: true } }
)

const Task = typedModel('task', TaskSchema)

export default Task
