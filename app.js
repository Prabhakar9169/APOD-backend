import express from 'express'
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import applicationError from './controllers/errorHandlerController.js'


const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/v1/user' , userRoute)
app.use (applicationError)

export default app