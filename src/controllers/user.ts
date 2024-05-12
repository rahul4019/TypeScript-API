import express from 'express';

import { getUsers, deleteUserById, getUserById, updateUserById } from '../Models/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        console.log('ID: ', id);
        console.log('USER NAME: ', username);

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await updateUserById(id, username);

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};