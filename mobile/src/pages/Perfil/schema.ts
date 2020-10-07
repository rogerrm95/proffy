import * as Yup from 'yup'

Yup.setLocale({
    mixed: {
        default: 'Entrada inválida',
        required: 'Há campos vazios, por favor revise o formulário!',
        notType: 'Há campos inválido, por favor revise o formulário'
    },
    string: {
        min: 'Nome e sobrenome devem ter mais de 3 caracteres',
        email: 'E-mail inválido'

    },
})

let schema = Yup.object().shape({
    avatar: Yup.string().required("Selecione uma foto de perfil antes de salvar"),
    name: Yup.string().min(3),
    lastname: Yup.string().min(3),
    email: Yup.string().email().required(),
    whatsapp: Yup.string().min(8, 'Informe um telefone válido (DD) XXXX-XXXX'),
    bio: Yup.string().required(),
    subject: Yup.string().required(),
    cost: Yup.number().required()
})

export default schema;