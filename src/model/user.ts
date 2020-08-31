import { createSchema, Type, typedModel } from 'ts-mongoose'

const UserSchema = createSchema(
    {
        name: Type.string({ required: true }),
        email: Type.string({ required: true, lowercase: true }),
        password: Type.string({ required: true })
    },
    { timestamps: { createdAt: true } }
)

const User = typedModel('user', UserSchema)

export default User
