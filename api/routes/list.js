import express from 'express'
import { viewPost,addPost,editPost,deletePost } from '../controllers/list.js'

const router = express.Router()

router.get('/view',viewPost)
router.post('/add',addPost)
router.post('/edit',editPost)
router.post('/delete',deletePost)

export default router