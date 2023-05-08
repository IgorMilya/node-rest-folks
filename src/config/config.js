import dotenv from 'dotenv'

dotenv.config()

export const { DB_URL, PORT } = process.env
export const connectionOptions = { useUnifiedTopology: true, useNewUrlParser: true }
