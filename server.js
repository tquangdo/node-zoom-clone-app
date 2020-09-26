const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require("peer")
const peerServer = ExpressPeerServer(server, {
    // debug: true,
})
app.use('/peerjs', peerServer) //kết hợp peer & peerjs
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`) //run "localhost:9000" sẽ redirect sang "localhost:9000/xxx"
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room }) //khi redirect thì truyền biến "roomId"=xxx
})
io.on('connection', socket => {
    socket.on('C_VOROOM_1', (roomId, userId) => {
        socket.userId = userId
        //★★★ 3)
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('S_USER_KETNOIOK_1', userId)
        //★★★ 8)
        socket.on('C_MSG_2', (arg_message) => {
            //send arg_message to the same room
            //★★★ 9)
            io.to(roomId).emit('S_GUI_MSG_ALL_2', arg_message, socket.userId)
        })

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('S_USER_OUT_3', userId)
        })
    })
})

//★★★ 1)
server.listen(process.env.PORT || 443, () => console.log('Server khoi dong OK!'))