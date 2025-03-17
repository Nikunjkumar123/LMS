const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db.js');
const authenticationRouter = require('./Routers/authenticationRouter.js')
const fileUpload = require('express-fileupload');
const cloudinary = require('./utils/cloudinary.js');
const verifyToken=require('./Middleware/verifyToken.js');
app.use(express.json());
app.use(express.static('./public'));
app.use(cookieParser());
app.use(
    cors({
      origin:["http://localhost:3002","http://localhost:3001"],
      credentials: true,
      methods: "GET,POST,DELETE,PATCH",
      allowedHeaders: "Content-Type, Authorization",
    })
  );
  app.options('*', cors());

app.use(fileUpload({useTempFiles:true}));
  
app.get('/', (req, res) => {
    res.send("API WORKING FINE");
});


app.use('/api/v1/auth',authenticationRouter);


connectDB(process.env.URL)
app.listen(process.env.PORT,(()=>{
    console.log("connected to Port",process.env.PORT);
}));