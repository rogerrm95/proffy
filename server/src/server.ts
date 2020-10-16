import express, { request } from 'express'
import cors from 'cors'
import path from 'path'

import routes from './routes';

const app = express();

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static(path.join(__dirname + '/temp/uploads')))

app.use(routes)

// http:/localhost:8081
app.listen(8081)    