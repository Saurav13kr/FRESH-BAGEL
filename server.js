require('dotenv').config()
const express = require("express");
const ejs= require("ejs");
const expressLayout  = require("express-ejs-layouts");
const app = express(); 
const path = require("path");
const port = process.env.port || 8000;
const Emitter = require('events')



const mongoose = require('mongoose');

const session= require("express-session");
const flash= require("express-flash");
const MongoStore = require("connect-mongo")
const passport = require('passport')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/freshbagel');
}


// mongodb://localhost:27017
// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

//session config



app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/freshbagel'}),
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24}
}))

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

//global misssleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//assets
app.use(express.static('public')) // For serving static files
app.use('/static',express.static('static')) // For serving static files
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views')) 
app.set('view engine', 'ejs')

// ENDPOINTS
require('./routes/web')(app)

// START THE SERVER
const server = app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
    //   console.log(socket.id)
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})