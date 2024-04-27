const path = require('path') 

import { NextFunction, Request, Response, Router } from 'express'
const express = require("express")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

export default function initializeServer(router: Router) {
  const app = express()
  const isProduction = process.env.NODE_ENV === 'production'
  const origin = { origin: isProduction ? false : '*' }

  app.set('trust proxy', 1)
  app.use(express.json())
  app.use(cookieParser())
  app.use(cors(origin))
  app.use(helmet())
  app.use(compression())

  app.use((request: Request, response: Response, next: NextFunction) => {
    response.header('Content-Security-Policy', "img-src 'self' *.githubusercontent.com")

    return next()
  })

  app.use(express.static(path.join(__dirname, '../../dist/')))
  app.use('/api', router)
  app.get('*', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '../../dist/index.html'))
  })

  return app
}
