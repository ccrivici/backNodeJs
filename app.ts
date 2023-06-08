import morgan from 'morgan';
import express from 'express'
import authRoutes from './src/routes/auth.routes'
import userRoutes from "./src/routes/user.routes";
const app = express();

app.use(morgan('dev'))
app.get('/',(req_res)=>{
    console.log("hola")
})

app.use('/api/auth',authRoutes)
export default app; 