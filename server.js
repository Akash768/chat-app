const express=require('express')
const http= require('http')

const app=express()
const server=http.createServer(app);

const port=process.env.PORT || 3000;

server.listen(port, ()=>{
    console.log(port)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/Chatapp.html')
})

// socket

const io=require('socket.io')(server)
io.on('connection', (socket)=>{
    console.log('connected...')

    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg)
    })
})
