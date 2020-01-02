const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3333;

app.get('/chat',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('ms', function(msg){
        console.log('socket_id: '+socket.id+' ms: ' + msg);
        io.emit('ms', msg);
    });
    console.log('socket_id: '+socket.id);
    socket.emit('ms','ola')
});

http.listen(port,()=>{
    console.log('whe are listen the ' + port + ' port');
})