const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { check, validationResult } = require('express-validator')



router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/specific', (req, res) => {
  res.send('We are on a specific Post')
})

router.post(
  '/',
  [check('title', 'Please enter the title').isEmpty()],
  
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length) {
        return res.status(400).json({ errors: errors })
      }
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
    })
    post.validate('createPost')

    try {
      const savedPost = await post.save()
      res.json(savedPost)
    } catch (err) {
      res.status(400).json({status: false,  message: err })
    }

    
  },
)

// get by id

router.get('/:postId', async (req, res) => {
  try {
    console.log(req.params.postId)
    const post = await Post.findById(req.params.postId)
    res.json(post)
  } catch (err) {
    res.json({ message: err })
  }
})

//delete post

router.delete('/:postId', async (req, res) => {
  const deletePost = await Post.remove({ _id: req.params.postId })
  res.json(deletePost)
})

//edit a post

router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } },
    )
    res.json(updatedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
