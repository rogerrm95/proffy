import { Response, Request, json } from 'express'
import db from '../database/connection'
import fs from 'fs'

const path = './src/temp/uploads'

export default class UploadsControllers {

    async create(req: Request, res: Response) {

        const { filename, originalname } = req.file
        const { email } = req.body

        const trx = await db.transaction()

        try {

            const oldImage = await trx('users').select('avatar').where('email', '=', email).first()

            const user = await trx('users')
                .update({ avatar: filename })
                .where('email', '=', email)
                .then(_ => {
                    // Em caso de sucesso, apaga a imagem antiga do usuário na pasta uploads //
                    fs.unlink(`${path}/${oldImage.avatar}`, function (err) { })
                })
                .catch(e => {
                    // Em caso de erro, apaga a imagem da past uploads //
                    fs.unlink(`${path}/${filename}`, function (err) { })
                })

            trx.commit()

            return res.status(201).send(filename)
        }
        catch (e) {

            trx.rollback()

            fs.unlink(`./public/${filename}`, () => { })

            return res.status(400).send('Erro')
        }
    }

    async delete(req: Request, res: Response) {

        const { image, email } = req.query as any

        const filename = image?.toString().split('/').pop()

        const trx = await db.transaction()

        try {

            await trx('users')
                .update('avatar', '')
                .where('email', '=', email)
                .then(_ => {
                    // Em caso de sucesso, apaga a imagem da past uploads //
                    fs.unlink(`${path}/${filename}`, function (err) {
                        if (err) res.status(404).send(err)
                    })
                })
                .catch(e => res.status(404).send('Usuário ou foto não encontrada'))

            trx.commit()

            return res.status(201).send()
        }
        catch (e) {

            trx.rollback()

            return res.status(400).send('Erro ao deletar imagem !')
        }
    }
}
