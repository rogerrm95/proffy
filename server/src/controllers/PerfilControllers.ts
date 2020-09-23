import { Request, Response } from 'express'
import db from './../database/connection'

import convertHoursInMinutes from '../utils/convertHoursInMinutes'
import convertMinutesInHours from '../utils/convertMinutesInHours'

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class PerfilControllers {
    async index(req: Request, res: Response) {
        
        const data = req.query
        const email = data.email as string

        try {

            const userFromDB = await db('users')
                .select('id', 'name', 'lastname', 'email', 'avatar', 'whatsapp', 'bio')
                .where('email', '=', email)
                .first()

            const classesFromDB = await db('classes')
                .select('subject', 'cost', 'id')
                .where('user_id', '=', userFromDB.id)

            const times = await db('class_schedule')
                .select('class_schedule.*')
                .join('classes', 'classes.id', '=', 'class_schedule.class_id')
                .join('users', 'users.id', '=', 'classes.user_id')
                .where('users.id', '=', userFromDB.id)

            times.forEach(time => {
                time.to = convertMinutesInHours(time.to)
                time.from = convertMinutesInHours(time.from)
            })

            const scheduleSubjects = classesFromDB.map(subs => {
                return {
                    id: subs.id,
                    subject: subs.subject,
                    cost: subs.cost,
                    timeOfClass: times.map(time => {
                        if (subs.id === time.class_id) {
                            return { ...time }
                        }
                    }).filter(time => time !== undefined)
                }
            })

            const user = {
                name: userFromDB.name,
                lastname: userFromDB.lastname,
                email: userFromDB.email,
                avatar: userFromDB.avatar,
                whatsapp: userFromDB.whatsapp,
                bio: userFromDB.bio,
                subjects: scheduleSubjects,
            }

            return res.status(201).json(user)

        } catch (e) {
            return res.status(400).send("Error, please refresh the page or log out!")
        }
    }

    async update(req: Request, res: Response) {
        const {
            oldEmail,name, lastname, avatar, email, whatsapp, bio, cost, subject 
        } = req.body

        const trx = await db.transaction()

        try {

            if (subject !== '' && cost === '') {
                await trx.rollback();

                return res.status(400).send('Por favor, informe o custo da aual')
            }

            if (subject === '' && cost !== '') {

                await trx.rollback();

                return res.status(400).send("Selecione uma matéria ou acesse: Home > Dar Aula - para cadastrar uma nova")
            }

            const userFromDB = await trx('users')
                .select('id')
                .where('email', '=', oldEmail)
                .first()

            await trx('users').update({
                name, lastname, avatar, email, whatsapp, bio
            }).where('id', '=', userFromDB.id)

            await trx('classes').update({
                cost
            }).where('subject', '=', subject)

            await trx.commit()

            return res.status(201).send()
        }
        catch (err) {

            await trx.rollback();

            res.status(400).send("Unexpected error while creating new class")
        }
    }

    async deleteTime(req: Request, res: Response) {

        const data = req.query

        const trx = await db.transaction()

        try {
            // Verificará se o usuário possui mais de um horário relacionado á aquela matéria //
            // SE - tiver mais registros, apagará apenas o horário especifíco //
            // SENÃO - Apagará o Registro e apagará também a matéria relacionada á aquele horário //

            await trx('class_schedule')
                .select('*')
                .where('id', '=', Number(data.id))
                .del()

            const hasMoreRegister = await trx('class_schedule')
                .select("*")
                .where('class_id', '=', Number(data.class_id))

            if (hasMoreRegister.length == 0) {
                await trx('classes')
                    .select('*')
                    .where('id', '=', Number(data.class_id))
                    .del()
            }

            trx.commit()

            return res.status(201).send()

        } catch (e) {

            trx.rollback()

            return res.status(400).send("Error, please try to delete again or refresh the page")
        }


    }
}