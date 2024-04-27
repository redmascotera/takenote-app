import { Router } from 'express'

import authRoutes from './auth'
import syncRoutes from './sync'

const router = Router()

router.use('/auth', authRoutes)
router.use('/sync', syncRoutes)

export default router
