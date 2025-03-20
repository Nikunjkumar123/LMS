const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db.js');
const SuperadminauthenticationRouter = require('./Routers/SuperadminauthenticationRouter.js')
const centreAuthenticationRouter = require('./Routers/centreAuthenticationRouter.js');
const franchiseauthenticationRouter = require('./Routers/franchiseauthenticationRouter.js');
const fileUpload = require('express-fileupload');
const cloudinary = require('./utils/cloudinary.js');
const verifyToken=require('./Middleware/verifyToken.js');
app.use(express.json());
app.use(express.static('./public'));
app.use(cookieParser());
app.use(
    cors({
      origin:["http://localhost:3002","http://localhost:3001","http://localhost:3000"],
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


app.use('/api/v1/Superadmin/auth',SuperadminauthenticationRouter); // Superadmin authentication 
app.use('/api/v1/franchise/auth',franchiseauthenticationRouter)//centre eqquiry data here
app.use('/api/v1/centre/auth',centreAuthenticationRouter); //centre authentication


connectDB(process.env.URL)
app.listen(process.env.PORT,(()=>{
    console.log("connected to Port",process.env.PORT);
}));