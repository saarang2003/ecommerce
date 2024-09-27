const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require("./routes/auth/auth-routes");


//create a database connection

mongoose.connect('mongodb+srv://saranggp2018:ecommerce2024@cluster0.m7rjl.mongodb.net/')
.then(() => console.log("mongoDb Connection"))
.catch((error) => console.log(error));



const app = express();
app.use(
    cors({
        origin :"http://localhost:5173",
        methods : ['GET', 'POST','DELETE', 'PUT'],
        allowedHeaders :[
           " Content-Type",
           "Authorization",
           "cache-Control",
           "Expires",
           "program"
        ],
        credentials :true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth/', authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use('api/shop/products' , shopProductsRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT , () =>{
    console.log(`server is listening on ${PORT}`);
})



