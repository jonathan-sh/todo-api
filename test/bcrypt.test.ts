import bcrypt from '../src/util/bcrypt'

describe('checking the good cases', () => {
    test('should be able to encode', (): void => {
        const hash = bcrypt.encode('my_password')

        expect(typeof hash).toBe('string')
    })

    test('should be able to match the password normally', (): void => {
        const hash = bcrypt.encode('my_password')
        const match = bcrypt.match('my_password', hash)

        expect(match).toBeTruthy()
    })
})

describe('checking the bad cases', () => {
    test('should be able to match the password normally', (): void => {
        const hash = bcrypt.encode('my_password')
        const match = bcrypt.match('wrong_password', hash)

        expect(match).toBeFalsy()
    })
})
