import jwt from '../src/util/jwt'
import { get } from 'lodash'

const mockUserId = '5f498b6e6b57acde6ea2d593'

describe('checking the good cases', () => {
    test('should be generated normally', async (): Promise<void> => {
        const token = jwt.generate(mockUserId)

        expect(typeof token).toBe('string')
    })

    test('should be verificaded normally', async (): Promise<void> => {
        const token = jwt.generate(mockUserId)
        const decoded = jwt.check(token)

        expect(decoded).not.toBeFalsy()
    })

    test('should be able to get the user_id', async (): Promise<void> => {
        const token = jwt.generate(mockUserId)
        const decoded = jwt.check(token)
        const userId = get(decoded, ['user_id'], 'without user id')

        expect(userId).toBe(mockUserId)
    })
})

describe('checking the bad cases', () => {
    test('should not be verified normally', async (): Promise<void> => {
        const token = jwt.generate(mockUserId, -1)
        const decoded = jwt.check(token)

        expect(decoded).toBeFalsy()
    })

    test('should not be able to get the user_id', async (): Promise<void> => {
        const token = jwt.generate(mockUserId)
        const decoded = jwt.check(token)
        const userId = get(decoded, ['payload', 'user_id'], 'without user id')

        expect(userId).toBe('without user id')
    })
})
