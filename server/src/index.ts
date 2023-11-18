import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import usersRouter from './routes/users.routes'
import databaseSetvices from './services/database.services'
import envConfig from './constants/config'
import { defaultErrorHandler } from './utils/errorHandler'
import roomsRouter from './routes/rooms.routes'
import utilitiesRouter from './routes/utilities.routes'
import bookingRouter from './routes/bookings.routes'
import * as paypal from './paypal-api'
import { Request, Response } from 'express'
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = envConfig

const base = 'https://api-m.sandbox.paypal.com'
const app = express()
app.use(
  cors({
    origin: ['http://localhost:4041', 'http://localhost:4042']
  })
)
/**Parse json  request bodies*/
app.use(express.json())
databaseSetvices.connect()

// app.use((req, res, next) => {
//   setTimeout(next, 1000)
// })

app.use('/user', usersRouter)
app.use('/rooms', roomsRouter)
app.use('/utilities', utilitiesRouter)
app.use('/bookings', bookingRouter)

// Create api routes for payment

// create order
app.post('/api/orders', async (req, res) => {
  try {
    const data = req.body
    const order = await paypal.createOrder(data)
    res.json(order)
  } catch (err: any) {
    res.status(500).send(err.message)
  }
})

// capture payment
app.post('/api/orders/:orderID/capture', async (req: Request, res: Response) => {
  const { orderID } = req.params
  try {
    const captureData = await paypal.capturePayment(orderID)
    res.json(captureData)
  } catch (err: any) {
    res.status(500).send(err.message)
  }
})

app.post('/api/orders/:orderID/refund', async (req: Request, res: Response) => {
  const { orderID } = req.params
  const { amount } = req.body

  try {
    const refundData = await paypal.refundPayment(orderID, amount)
    res.json(refundData)
  } catch (err: any) {
    res.status(500).send(err.message)
  }
})

app.use(defaultErrorHandler)
app.use(morgan('dev'))

app.listen(envConfig.PORT, () => {
  console.log(`Server starting on PORT: ${envConfig.PORT}`)
})
