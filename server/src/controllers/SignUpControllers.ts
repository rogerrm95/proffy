import { Response, Request, json } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../database/connection'

import encryptPassword from '../utils/encryptPassword'

const { authSecret } = require('./../../.env')

export default class SignUpControllers {

    async create(req: Request, res: Response) {

        const user = { ...req.body }

        try {
            const userFromBD = await db('users').where({ email: user.email }).first()

            user.password = encryptPassword(user.password)
            delete user.confirmPassword

            // Salvando no Banco de Dados //
            await db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send('E-mail já cadastrado'))
        }
        catch (e) {
            res.status(400).send('Erro durante o processamento, por favor, tente novamente')
        }
    }
}