import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { Request, Response } from 'express-serve-static-core';
import path from 'path';
import AuthorizationMiddleware from './middlewares/AuthorizationMiddleware';
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer({storage})

app.post("/upload", AuthorizationMiddleware, upload.single("sharex"), (req: Request, res: Response) => {
    res.send(process.env.DOMAIN! + req.file?.filename);
})

app.use(express.static(path.resolve(__dirname, '../uploads')));

app.listen(process.env.PORT);