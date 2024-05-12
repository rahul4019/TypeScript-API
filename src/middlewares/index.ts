import express from 'express';
import { get, identity, merge } from 'lodash';

import { getUserBySessionToken } from '../Models/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['token'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};