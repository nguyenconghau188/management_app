import { Router } from 'express';
import User from '../models/user';
import auth from '../middleware/auth';

const router = Router();

router.post('/users/create', async (req, res) => {
    //create new user
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    //login user
    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({error: 'Login fail!'});
        }
        const token = await user.generateAuthToken();
        console.log(user);
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});
  
        res.send({users});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()

        res.send();
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/users/logout', auth, async(req, res) => {
    // Log user out
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save()
        
        res.send();
    } catch (error) {
        res.status(500).send(error)
    }
});

export default router;