const express = require('express');

const cors = require('cors');

const app = express();
app.use(cors);
app.use(express.json());


const port = 8081;

app.listen(port, ()=>{
    console.log(`server running on port : ${port}`);
})

