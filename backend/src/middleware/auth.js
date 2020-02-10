import jwt from 'jsonwebtoken';
import User from '../models/user';

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = User.findOne({ '_id': data._id, 'tokens.token': token });
        console.log(user)
        if (!user) {
            res.status(401).send({ error: 'Not authorized to access this resource' });
        }

        req.user = user;
        req.token = token;

        next();
    } catch (e) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}

export default auth;