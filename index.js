//importing
const express = require('express');
const mongoose = require('mongoose');

//app config
const app=express();
const port=process.env.PORT || 9000;

//middleware
app.use(express.json());

//DB Connection
const uri = "mongodb+srv://sidrusiya:Sidrusiya1@cluster0.xdkvg.mongodb.net/Production?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", ()=>{
    console.log("DB connection");
    
    app.get("/product",(req, res)=>{
        db.collection("Products").find().toArray()
        .then(results => {
        res.send(results)
        })
        .catch(error => console.error(error))
    });
    

    app.post('/product/new', (req, res) => {
        db.collection('Products').insertOne(req.body)
          .then(result => {
            res.redirect('/product');
          })
          .catch(error => console.error(error))
    })
    
})


//listen
app.listen(port, ()=>console.log(`Listening on ${port}`));