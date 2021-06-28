const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

//app
const app = express();

//set database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DB CONNECTION ERROR: ", err);
  });


  //middlewares
  app.use(morgan("dev"))
  app.use(bodyParser.json({limit: "4mb"}))
  app.use(cors());

  //route
  app.get('/api', (req,res)=>{
    res.json({
      data: 'hit the node api'  
    })
  })


  const PORT = process.env.PORT || 7000;

  app.listen(PORT, ()=>{
      console.log(`server is running  on ${PORT}`);})