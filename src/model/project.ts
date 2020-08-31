import { createSchema, Type, typedModel } from 'ts-mongoose'

const ProjectSchema = createSchema(
    {
        name: Type.string({ required: true }),
        user_id: Type.string()
    },
    { timestamps: { createdAt: true } }
)

const Project = typedModel('project', ProjectSchema)

export default Project
