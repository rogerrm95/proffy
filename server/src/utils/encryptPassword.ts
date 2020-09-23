import bcrypt from 'bcrypt'

export default function encryptPassword(password: string){

    const salt = bcrypt.genSaltSync(10)

    return bcrypt.hashSync(password, salt)
}