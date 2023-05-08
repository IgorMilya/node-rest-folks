import express from 'express'
import cors from 'cors'
import router from './src/routes/router.js'
import { tablesDefaultPath, tablesRouter } from './src/tables/routes.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/api/restaraunt', router)
app.use(tablesDefaultPath, tablesRouter)
