const express =require('express'); //express is used for handling http innode
const connectDB=require('./config/db');
const app=express();


//Connect DBs
connectDB();

//Init Middleware
app.use(express.json({extended:false}));


 

//Defining Routes for each page like users,auth and contacts.
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));


const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));