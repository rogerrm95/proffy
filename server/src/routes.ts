import express from 'express'
import multer from 'multer';

// Config //
import * as multerConfig from './config/multer';

// Controllers //
import ConnectionsControllers from './controllers/ConnectionsControllers';
import ClassesControllers from './controllers/ClassesControllers';
import SignInControllers from './controllers/SignInControllers';
import SignUpControllers from './controllers/SignUpControllers';
import ForgotPasswordControllers from './controllers/ForgotPasswordControllers';
import PerfilControllers from './controllers/PerfilControllers';
import UploadControllers from './controllers/UploadControllers';

const routes = express.Router()

const classesControllers = new ClassesControllers()
const connectionsControllers = new ConnectionsControllers()
const signInControllers = new SignInControllers()
const signUpControllers = new SignUpControllers()
const forgotPasswordControllers = new ForgotPasswordControllers()
const perfilControllers = new PerfilControllers()
const uploadControllers = new UploadControllers()

// ROTAS //
routes.post('/classes', classesControllers.create)
routes.get('/classes', classesControllers.index)

routes.post('/connections', connectionsControllers.create)
routes.get('/connections', connectionsControllers.index)

routes.post('/signin', signInControllers.create)
routes.post('/validate-token', signInControllers.validate)

routes.post('/signup', signUpControllers.create)

routes.post('/forgot-pass', forgotPasswordControllers.create)
routes.post('/reset-pass', forgotPasswordControllers.update)

routes.get('/perfil', perfilControllers.index)
routes.put('/perfil', perfilControllers.update)
routes.delete('/perfil', perfilControllers.deleteTime)

routes.post('/upload', multer(multerConfig).single('file'), uploadControllers.create)
routes.delete('/upload', uploadControllers.delete)

export default routes;