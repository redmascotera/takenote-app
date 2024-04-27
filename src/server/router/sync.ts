import { Router } from 'express'

import syncHandler from '../handlers/sync'
import checkAuth from '../middleware/checkAuth'
import getUser from '../middleware/getUser'

const router = Router()

router.post('/', checkAuth, getUser, syncHandler.sync)
router.get('/notes', checkAuth, getUser, syncHandler.getNotes)
router.get('/categories', checkAuth, getUser, syncHandler.getCategories)

export default router
