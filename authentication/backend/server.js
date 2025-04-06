import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDb from "./config/mongoDb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import bookRouter from "./routes/bookRoutes.js";


const app = express();

const port = process.env.PORT || 4000;
connectDb();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}));





app.get('/',(req, res)=> res.send("APi working"));
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.use('/api/summary',bookRouter);

app._router.stack.forEach((r) => {
    if (r.route) {
        console.log(r.route.path);
    } else if (r.name === 'router') {
        r.handle.stack.forEach((s) => {
            if (s.route) {
                console.log(s.route.path);
            }
        });
    }
});


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    });