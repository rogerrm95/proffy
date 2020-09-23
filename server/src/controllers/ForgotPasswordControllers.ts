import { Request, Response } from 'express'
import crypto from 'crypto'
import db from "../database/connection";

import encryptPassword from '../utils/encryptPassword';

const mailer = require('./../modules/mailer')

export default class ForgotPasswordControllers {

    async create(req: Request, res: Response) {
        const { email } = req.body

        try {

            const userFromDB = await db('users').where('email', '=', email).first()

            if (userFromDB.length == 0) {
                res.status(404).send('Usuário não encontrado!')
            }

            const token = crypto.randomBytes(20).toString('hex')

            const name = userFromDB.name

            const now = new Date();
            now.setHours(now.getHours() + 1)

            await db('users')
                .where('id', '=', userFromDB.id)
                .update('passwordResetToken', token)
                .update('passwordResetExpires', now)


            mailer.sendMail({
                to: email,
                from: 'equip_proffy@gmail.com',
                subject: "Alteração de Senha",
                template: '/forgot_password',
                context: { token, name, email }
            })

            res.status(201).send('OK')

        } catch (e) {
            res.status(500).send('Erro durante o processamento, tente novamente!')
        }
    }

    async update(req: Request, res: Response) {

        const {email, token, password, confirmPassword} = req.body

        try {

            const userFromDB = await db('users').where('email', '=', email).first()

            if (!userFromDB) {
                return res.status(400).send('Erro, usuário não encontrado!' )
            }
            if (token !== userFromDB.passwordResetToken) {
                return res.status(400).send('Erro, Token inválido!')
            }

            const now = new Date().getTime()

            if (now > userFromDB.passwordResetExpires) {
                return res.status(400).send('Erro, token expirado')
            }

            if(password !== confirmPassword){
                return res.status(400).send('Senhas não conferem')
            }

            delete req.body.confirmPassword
            const newPassword = encryptPassword(password)

            await db('users')
                .where('email', '=', email)
                .update('password', newPassword)
                .update('passwordResetToken', '')
                .update('passwordResetExpires', '')

            return res.status(201).send('OK')

        } catch (e) {
            return res.status(400).send('Erro: Não foi possível resetar a senha, tente novamente')
        }

        res.send('ok')
    }
}