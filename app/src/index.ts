import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { Request, Response } from 'express-serve-static-core';
import path from 'path';
import AuthorizationMiddleware from './middlewares/AuthorizationMiddleware';
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { existsSync, mkdir } from 'fs';
import bodyParser from 'body-parser';

const maxFileSize: number = typeof process.env.SIZE === "number" ? process.env.SIZE : 100;

if (!existsSync(path.resolve(__dirname, '../uploads'))) {
    mkdir(path.resolve(__dirname, '../uploads'), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer({
    storage, 
    limits: { fileSize: maxFileSize*1024*1024 }
})

app.use(bodyParser.urlencoded({extended: true, limit: `${maxFileSize}mb`}));

app.post("/upload", AuthorizationMiddleware, upload.single("sharex"), (req: Request, res: Response) => {
    res.send((process.env.SSL! ? 'https://' : 'http://') + process.env.DOMAIN! + '/' + req.file?.filename);
});

app.use(express.static(path.resolve(__dirname, '../uploads')));

app.use('*', (req, res) => {
    res.status(400).send('File not found.')
})

app.listen(process.env.PORT);