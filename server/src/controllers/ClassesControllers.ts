import { Request, Response } from 'express'
import convertMinutesInHours from '../utils/convertMinutesInHours'

import db from './../database/connection'

// Funções úteis //
import convertHoursInMinutes from './../utils/convertHoursInMinutes'
import compareTimes from './../utils/validation'

interface ScheduleItem {
    week_day: Number | String,
    from: String,
    to: String
}

interface idProps {
    id: number
}

export default class ClassesControllers {

    async index(req: Request, res: Response) {
        const filters = req.query

        const week_day = filters.week_day as string
        const subject = filters.subject as string
        const time = filters.time as string

        // Verificará se há filtros selecionados //
        if (!filters.week_day || !filters.subject || !filters.time) {
            return res.status(400).send("Preencha todos os filtros para realizar a pesquisa")
        }

        const timeInMinutes = convertHoursInMinutes(time)

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id` ')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

        const classTimes = await db('class_schedule')
            .select('week_day', 'from', 'to', 'users.id AS userID')
            .join('classes', 'classes.id', '=', 'class_schedule.class_id')
            .join('users', 'users.id', '=', 'classes.user_id')
            .where('classes.subject', '=', subject)


        const data = classes.map(classItem => {

            let schedule = [] as any

            classTimes.map((item, index) => {
                if (classItem.id == item.userID) {
                    item.from = convertMinutesInHours(item.from)
                    item.to = convertMinutesInHours(item.to)
                    return schedule.push(item)
                }
            })

            return {
                ...classItem, times: schedule
            }
        })

        return res.json(data)
    }

    async create(req: Request, res: Response) {
        const {
            email, whatsapp, bio, cost, subject, schedule
        } = req.body

        const trx = await db.transaction()

        try {

            const { id } = await trx('users').select('id').where('email', '=', email).first()

            let classId: number | Array<Number>

            await trx('users').update({ whatsapp, bio }).where('id', '=', id)


            /* subjectRegistered: - Verifica se o usuário já possui a matéria cadastrada: 
                -- Se não possuir, adiciona um novo;
                -- Se Possuir, atualizará ou manterá o custo $ da aula.
             */

            const subjectRegistered = await trx('classes')
                .select('id')
                .where(function () {
                    this.where('user_id', '=', id).andWhere('subject', '=', subject)
                })

            if (subjectRegistered.length === 0) {

                const insertedClassesId = await trx('classes').insert({
                    subject, cost, 'user_id': id
                })

                classId = insertedClassesId[0]

            } else {

                classId = subjectRegistered[0].id

                await trx('classes')
                    .update({ cost })
                    .where(function () {
                        this.where('user_id', '=', id).andWhere('subject', '=', subject)
                    })
            }

            const classSchedule = schedule.map((schedule: ScheduleItem) => {
                return {
                    class_id: classId,
                    week_day: schedule.week_day,
                    from: convertHoursInMinutes(schedule.from),
                    to: convertHoursInMinutes(schedule.to)
                }
            })

            // ScheduleFromBD - será usado para verificar se já existe horários cadastrados //
            const scheduleFromDB = await trx('class_schedule')
                .select('class_schedule.*')
                .join('classes', 'classes.id', '=', 'class_schedule.class_id')
                .join('users', 'users.id', '=', 'classes.user_id')
                .where('users.id', '=', id)

            let isRegisted: boolean = false

            classSchedule.forEach((schedule: any) => {

                isRegisted = compareTimes(schedule, scheduleFromDB) as boolean

            })

            if (isRegisted) {

                trx.rollback();

                res.status(400).send('Horários já cadastrados')
            }

            await trx('class_schedule').insert(classSchedule)

            await trx.commit()

            return res.status(201).send()
        }
        catch (error) {

            await trx.rollback();

            res.status(400).send("Unexpected error while creating new class")
        }
    }
}