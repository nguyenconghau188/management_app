import _assign from "lodash/assign";
import { Router } from "express";
import Post from '../models/post';
import auth from '../middleware/auth';
import 'babel-polyfill';

const router = Router();

const handlePageError = (res, e) => res.setStatus(500).send(e.message);

//create document
router.post(
    '/posts',
    auth,
    async (req, res) => {
        try {
            const post = await new Post(req.body).save();

            return res.send({
                message: 'Create new data successfully.',
                data: post
            })
        } catch (e) {
            return handlePageError(res, e);
        }
    }
);

router.put(
    '/posts/:id',
    auth,
    async (req, res) => {
        try {
            await Post.findByIdAndUpdate(req.params.id, req.body);

            return res.json({message: 'Update post successfully!'});
        } catch (e) {
            return handlePageError(res, e);
        }
    }
);

router.get(
    '/posts/:id',
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            return res.send(post);
        } catch (e) {
            return handlePageError(res, e);
        }
    }
);

router.get(
    '/posts',
    auth,
    async (req, res) => {
        try {
            const options = {
                sort: { _id: -1},
                limit: parseInt(req.query.limit || 20, 10),
                page: parseInt(req.query.page || 1, 10)
            }

            const posts = await Post.paginate({}, options);

            return res.send(posts);
        } catch (e) {
            return handlePageError(res, e);
        }
    }
);

router.get(
    '/posts/delete/:id',
    auth,
    async (req, res) => {
        try {
            await Post.remove({ _id: req.params.id });

            return res.json({message: 'Post has been removed!'});
        } catch (e) {
            return handlePageError(res, e);
        }
    }
);

export default router;