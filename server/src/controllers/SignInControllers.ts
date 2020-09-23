import { Response, Request, json } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import encryptPassword from '../utils/encryptPassword'
import db from '../database/connection'

const { authSecret } = require('./../../.env')

export default class SingInController {

    async create(req: Request, res: Response) {

        try {
            const { email, password } = req.body

            console.log(email)

            const user = await db('users')
                .where({ email: email })
                .first()

            if (!user) return res.status(401).send('Usuário não encontrado!')

            const isMatch = bcrypt.compareSync(password, user.password)

            if (!isMatch) return res.status(401).send('Senha inválida')

            const now = Math.floor(Date.now() / 1000)

            const payload = {
                iat: now, // Criado em ...
                exp: now + (60 * 60 * 5), // Expirará em  1 hora...
                name: user.name,
                lastname: user.lastname,
                avatar: user.avatar,
                email: user.email
            }

            return res.json({
                ...payload,
                token: jwt.sign(payload, authSecret)
            })
        }
        catch (error) {
            res.status(400).send("Error during the processing, try again!")
        }

    }

    validate(req: Request, res: Response) {
        const userData = req.body

        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret) || Object

                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (error) {
            res.status(400).send("Failed in authorization")
        }

        return res.send(false)
    }
}