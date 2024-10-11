import mongoose from 'mongoose';
const DB_HOST = "mongodb+srv://admin:<pass>@cluster0.q4y5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => console.log("succes"))
    .catch(error =>  console.log(error));

