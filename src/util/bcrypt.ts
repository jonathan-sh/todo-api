import * as bcrypt from 'bcrypt'

const encode = (password: string): string => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

const match = (password: string, db_password: string): boolean => {
    const result = bcrypt.compareSync(password, db_password)

    return result
}

export default { encode, match }
