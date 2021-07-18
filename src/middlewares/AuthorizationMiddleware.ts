import { Request, Response, NextFunction } from "express";

export default function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    if (typeof req.headers.authorization !== "string") {
        return res.status(401).send("Invalid API key");
    }

    const key = req.headers.authorization.split(' ');
    if (key.length !== 2) {
        return res.status(401).send("Invalid API key");
    }

    if (key[1] !== process.env.API_KEY) {
        return res.status(401).send("Invalid API key");
    }

    next();
}