const {Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/Auth');
const { User } = require('../db/db');

router.get('/', authMiddleware, async(req, res) => {
    const findLib = await User.find({username: res.locals.data}, {library: true});
    res.json({library: findLib})
})

router.post('/:bookId', authMiddleware, async(req, res) => {
    await User.findOneAndUpdate({username: res.locals.data}, {$push: {library: req.params.bookId}})
    res.json({msg: "Added"});
})

router.delete('/:bookId', authMiddleware, async(req, res) => {
    await User.updateOne({username: res.locals.data}, {$pull: {library: req.params.bookId}});
    res.json("Deleted");
})

module.exports = router