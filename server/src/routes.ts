import express from 'express'

// Controllers //
import ConnectionsControllers from './controllers/ConnectionsControllers';
import ClassesControllers from './controllers/ClassesControllers';
import SignInControllers from './controllers/SignInControllers';
import SignUpControllers from './controllers/SignUpControllers';
import ForgotPasswordControllers from './controllers/ForgotPasswordControllers';
import PerfilControllers from './controllers/PerfilControllers';

const routes = express.Router()

const classesControllers = new ClassesControllers()
const connectionsControllers = new ConnectionsControllers()
const signInControllers = new SignInControllers()
const signUpControllers = new SignUpControllers()
const forgotPasswordControllers = new ForgotPasswordControllers()
const perfilControllers = new PerfilControllers()

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

export default routes;