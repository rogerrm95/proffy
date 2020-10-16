import path from 'path'
import multer from 'multer'
import crypto from 'crypto'

module.exports = {
    dest: path.resolve(__dirname, '..','temp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, path.resolve(__dirname, '..','temp', 'uploads'))
        },
        filename: (req: any, file: any, cb: any) => {
            crypto.randomBytes(8, (err, hash) => {
                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                cb(null, fileName)
            })
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 25
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes =  [
            'image/jpeg',
            'image/pjpeg',
            'image/jpg',
            'image/png',
            'image/gif'
        ]

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        } else{
            cb(new Error("Tipo de imagem inválida"))
        }
    }
}