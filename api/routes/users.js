import express from 'express'
import { loginCheck} from '../controllers/users.js'

const router = express.Router()

router.post('/login',loginCheck)

export default router