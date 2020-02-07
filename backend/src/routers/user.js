import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.post('/users/create', async (req, res) => {
    //create new user
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        console.log(token)
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    //login user
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({error: 'Login fail!'});
        }
        const token = await user.generateAuthToken();

        res.status(200).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

export default router;