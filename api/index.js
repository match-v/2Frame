import express from 'express'
import listRoutes from './routes/list.js'
import userRoutes from './routes/users.js'
import bodyParser from 'body-parser'


const app = express()

app.use(express.json())
app.use(bodyParser.json());

app.use('/api/list',listRoutes)
app.use('/api',userRoutes)

app.listen(8081,()=>{
  console.log('连接成功～')
})
