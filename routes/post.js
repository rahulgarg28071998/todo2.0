const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// get all the post
router.get('/', async (req, res) => {
    try {
        const posts = await Task.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
})


//submit the post
router.post('/', async (req, res) => {
    console.log("post called");
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        asignedOn:req.body.asignedOn,
        dueDate:req.body.dueDate,
        asignee:req.body.asignee,
        status:req.body.status
    });
    try {
        const savedPost = await task.save()
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
})

//specific post
router.get('/:postId', async (req, res) => {
    //console.log(req.params.postId);
    try {
        const post = await Task.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//delete post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Task.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//update post
router.patch('/:postId', async (req, res) => {
    try {
        const removedPost = await Task.updateOne({ _id: req.params.postId },{$set:{title:req.body.title}});
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;