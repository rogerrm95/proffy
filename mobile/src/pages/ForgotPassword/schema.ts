import * as Yup from 'yup'

Yup.setLocale({
    mixed: {
        default: 'Entrada inválida',
        required: 'Há campos vazios, por favor revise o formulario!',
    },
})

let schema = Yup.object().shape({
    email: Yup.string().email('informe um e-mail válido').required('Informe seu e-mail'),
})

export default schema;