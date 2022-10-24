const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const DB = require('./DB')
const Engine = require('./engine');
const Session = require('./session');

// app
app.use('/client', express.static('client'));
app.use(Session.s_middleware);

//read req.bpdy
app.use(express.urlencoded({ extended: true }))

app.get('', (req, res) => {

    console.log(req.session.Auth);

    if (req.session.Auth)
        res.sendFile('/index.html', {root : 'client'});
    else
        res.sendFile('/login.html', {root : 'client'});
})

app.post('/connect', async (req, res) => {
    const result = await DB.S_user.find({id : req.body.id, pw : req.body.pw});
    if(result.length == 0) {
        const new_user = new DB.S_user({ id: req.body.id, password: req.body.pw });
        await new_user.save();
    }
    req.session.Auth = req.body.id;
    res.redirect("/");
})

// io
io.on('connection', (socket) => {
    console.log('Player connected!', socket.id);

    //socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    
    socket.on('location', (data) => {
        console.log(data);
        io.emit('location', data)
    })
});

// server started listening
server.listen(3000, () => {
    console.log(`server started listening on port 3000`)
})

// start engine
const engine = new Engine();