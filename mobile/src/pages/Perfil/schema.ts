import * as Yup from 'yup'

const regexMoney = /^[1-9]\d{0,2}(\.\d{3})*,\d{2}$/g

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
    email: Yup.string().email().required("Informe um E-mail"),
    whatsapp: Yup.string().min(8, 'Informe um telefone válido (DD) XXXX-XXXX'),
    bio: Yup.string().required("Informe uma Bio"),
    cost: Yup.string().max(9).matches(regexMoney, "Informe um valor válido")
})

export default schema;