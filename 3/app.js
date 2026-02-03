import express from 'express'
import rgbRouter from './controllers/rgbRoute.js'


const app = express()
app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})


app.use('/api', rgbRouter)

export default app