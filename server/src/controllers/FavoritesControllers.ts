import { Request, Response } from 'express'

import db from "../database/connection";
import convertMinutesInHours from '../utils/convertMinutesInHours';

interface FavoritesProps {
    id: string
}

export default class FavoritesControllers {

    async index(req: Request, res: Response) {
        const data = req.query

        const email = data.email as string

        try {

            const { id } = await db('users').select('id').where('email', '=', email).first()

            const teacherList = await db('users')
                .leftJoin('classes', 'classes.user_id', '=', 'users.id')
                .select(
                    'users.name', 'users.email', 'users.lastname', 'users.avatar', 'users.bio', 'users.whatsapp', 'classes.*')
                .whereIn('users.id', function () {
                    this.select('teacher_id')
                        .from('favorites')
                        .where('user_id', '=', id)
                })

            const classTimes = await db('class_schedule')
                .select('week_day', 'from', 'to', 'users.id AS userID', 'class_schedule.class_id AS classID')
                .join('classes', 'classes.id', '=', 'class_schedule.class_id')
                .join('users', 'users.id', '=', 'classes.user_id')
                .whereIn('users.id', function () {
                    this.select('teacher_id')
                        .from('favorites')
                        .where('user_id', '=', id)
                })

            const data = teacherList.map(teacherItem => {

                let schedule = [] as any

                classTimes.map((item, index) => {
                    if (teacherItem.id == item.classID) {
                        item.from = convertMinutesInHours(item.from)
                        item.to = convertMinutesInHours(item.to)
                        return schedule.push(item)
                    }
                })

                return {
                    ...teacherItem, times: schedule
                }
            })

            console.log(data)

            res.status(201).json(data)
        }
        catch (e) {
            res.status(400).send('Erro durante o processamento, tente novamente')
        }
    }

    async create(req: Request, res: Response) {

        const { teacher_id, email, subject } = req.body

        const trx = await db.transaction()

        try {

            const { id } = await trx('users').select('id').where('email', '=', email).first()

            await trx('favorites')
                .insert({ user_id: id, teacher_id, subject })

            trx.commit()

            res.status(201).send()
        }
        catch (e) {
            trx.rollback()

            res.status(400).send('Erro durante o processamento, tente novamente')
        }
    }
}