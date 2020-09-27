import * as Yup from 'yup'

const regexTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g

Yup.setLocale({
    mixed: {
        default: 'Dados inválidos',
        notType: 'Dados inválidos',
    },
    string:{
        matches: 'Formato inválido, siga este formato -> 00:00'
    }
})
