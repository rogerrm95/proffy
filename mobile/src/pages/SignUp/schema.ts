import * as Yup from 'yup'

// Senha deverá conter uma letra maiuscula e minuscula, bem como um simbolo especial e um número //
// O tamanho da senha é mínimo de 8 caracter //
const regexPassword = /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g

Yup.setLocale({
    mixed: {
        default: 'Entrada inválida',
        required: 'Há campos vazios, por favor revise o formulario!',
    },
    string:{
        matches: 'Informe uma senha forte com 8 caracteres contendo letras maiúsculas, números e símbolos.'
    },
})

let schema = Yup.object().shape({
    name: Yup.string().min(3, 'Nome deve conter ao menos 3 letras'),
    lastname: Yup.string().min(3, 'Sobrenome deve conter ao menos 3 letras'),
    email: Yup.string().email().required('Informe seu e-mail'),
    password: Yup.string().required().matches(regexPassword)
})

export default schema;