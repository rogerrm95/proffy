import Nodemailer from 'nodemailer'
import { host, port, user, pass} from "./mail.json"
import path from 'path'

const hbs = require('nodemailer-express-handlebars')

const transport = Nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass
    }
})

transport.use('compile', hbs({
    viewEngine: {
        extName: '.html',
        partialsDir: path.resolve('./resources/mail/'),
        layoutsDir: '',
        defaultLayout: '',
      },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
    defaultLayout: false
}))

module.exports = transport;