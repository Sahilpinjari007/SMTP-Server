import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


// app config
const app = express();


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: process.env.CORS_CREDENTIAL
}))


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser());


// import routers
import emailRouter from './routes/email.routes.js';


// define routes
app.use('/api/v1/mail', emailRouter);


app.get("/", (req, res)=>{
  res.send('Bro it is SMTP Server!...')
})


app.listen(process.env.PORT, (err) => {

  if (err) {
    console.log("Something went wrong!...", err);
    return;
  }

  console.log(`app running on port ${process.env.PORT}!...`);
});
