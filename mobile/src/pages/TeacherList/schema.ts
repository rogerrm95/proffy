import * as Yup from 'yup'

const regexTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g

Yup.setLocale({
    mixed: {
        default: 'Preencha todos os formulários!',
    },
    string:{
        matches: 'Informe um horário entre 00:00 - 23:59'
    }
})

const Schema = Yup.object().shape({
    time: Yup.string().matches(regexTime)
})

export default Schema;