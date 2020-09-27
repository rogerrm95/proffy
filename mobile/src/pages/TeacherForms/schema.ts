import * as Yup from 'yup'

const regexTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g

Yup.setLocale({
    mixed: {
        default: 'Entrada inválida',
        required: 'Há campos vazios, por favor revise o formulario!',
        notType: 'Há campos inválido, por favor revise o formulario'
    },
    string:{
        min: 'Informe um telefone válido (XX) 9999-9999',
        matches: 'Horas inválidas, siga este formato -> HH:MM'
    },
})

let schema = Yup.object().shape({
    whatsapp: Yup.string().min(8).required(),
    bio: Yup.string().max(300).required(),
    subject: Yup.string().required(),
    cost: Yup.number().required(),
    schedule: Yup.array().of(Yup.object().shape({
        week_day: Yup.number().required(),
        from: Yup.string().matches(regexTime).required(),
        to: Yup.string().matches(regexTime).required()
    }))
})

export default schema;