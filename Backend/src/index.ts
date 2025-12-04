import path from 'path';
import dotenv from 'dotenv';

// Load ENV BEFORE ANYTHING ELSE
dotenv.config();

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';


const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

const port = Number(process.env.PORT || 4000)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`)
})

