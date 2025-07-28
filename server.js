import express from 'express'
import dotenv from 'dotenv'
import db from './config/connection.js'
import userRouter from './routes/users.js'
import projectRouter from './routes/projects.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// ============= Middleware ============= //
app.use(express.urlencoded({ extend: true }))
app.use(express.json())

// ============ Routes ================ //
app.use('/api/users', userRouter)
app.use('/api/projects', projectRouter)

// ===== Test Initial Connection Route ==== //
let isConnected = false
app.get('/', (req, res) => {
  if (!isConnected) {
    return res.json({ message: 'Successful Connection!' })
  } else {
    return res.status(500).json({ message: 'Failed to connect to DB!' })
  }
})

// ====== Start Server =========== //
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`))
})
