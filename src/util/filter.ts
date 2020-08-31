import { get } from 'lodash'
import CustonRequest from '../middlewares/auth'

export interface UserEntityFilter{
    _id: string;
    user_id: string;
}

const getUserEntityFilter = (request: CustonRequest): UserEntityFilter => {
    const filter: UserEntityFilter = {
        _id: get(request, ['params', 'id'], 'no entity id'),
        user_id: get(request, ['user_id'], 'no user id')
    }

    return filter
}

export { getUserEntityFilter }
