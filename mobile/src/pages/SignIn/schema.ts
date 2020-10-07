import * as Yup from 'yup'

Yup.setLocale({
    mixed: {
        default: 'Entrada inválida',
        required: 'Preencha todos os campos',
    },
})

let schema = Yup.object().shape({
    email: Yup.string().email('informe um e-mail válido'),
    password: Yup.string().min(8, 'Senha inválida, mínimo de 8 caracteres'),
})

export default schema;