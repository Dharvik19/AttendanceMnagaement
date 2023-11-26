const express = require('express');

const cors = require('cors');
const database = require('./utils/dataBase');
const app = express();

const router = require('./routes/routes');
const port = 8081;
var corsOptions = {
    origin: 'http://localhost:5000', 
    optionsSuccessStatus: 200 
  }
  
  app.use(cors(corsOptions));
  
  app.use(express.json());
  
  
  
  app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
  
  
  

app.get('/', (req, res) => {
    return res.json('from the backend side');
  });
  
database.connect((err)=>{
    if(err){
        console.log("error Connecting")
    }else{
        console.log("connection successfull")
    }
})
app.listen(8081, () => {
    console.log('listening');
  });
app.use(router);

