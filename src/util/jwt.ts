import jwt, { Secret } from 'jsonwebtoken'

const KEY: Secret = '28064212';

const generate = (user_id: string, tll = 30000): string => {
    const exp = Math.floor(Date.now() / 1000) + tll
    return jwt.sign({ user_id, exp }, KEY)
};

const check = (token: string): any|boolean => {
    try {
        return jwt.verify(token, KEY)
    } catch (error) {
        return false
    }
};

export default { generate, check }
